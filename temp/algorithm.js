/* =========================
   ANX SMART SEMANTIC SORTER v2.0
   Ultra-Robust | Any JSON Format | Quiz-Aware
========================= */

const SYNONYM_DICT = {
  "developer": ["dev", "coder", "programmer", "engineer", "software", "coding", "ai developer", "indie builder"],
  "entrepreneur": ["founder", "startup", "business", "ceo", "biz", "company", "online biz"],
  "trader": ["trading", "stocks", "crypto", "forex", "investor", "market", "crypto degen", "stock market"],
  "student": ["learner", "studying", "education", "college", "university", "beginner", "student life"],
  "creator": ["influencer", "youtuber", "content", "vlogger", "ugc", "social", "content creator", "influencer"],
  "designer": ["design", "ui", "ux", "graphics", "figma", "visual", "designer"],
  "video": ["youtube", "reel", "shorts", "vlog", "editing", "film", "video editor"],
  "ai": ["artificial intelligence", "llm", "ml", "machine learning", "gpt", "neural"],
  "mvp": ["minimum viable product", "prototype", "beta", "launch", "building mvp"],
  "scaling": ["growth", "scale", "expand", "advanced", "pro", "scaling to the moon"],
  "insta": ["instagram", "social media", "reels", "stories", "insta", "saw on insta"],
  "youtube": ["yt", "video platform", "channel", "youtube video"],
  "google": ["search", "seo", "organic", "google search"],
  "friend": ["referral", "word of mouth", "recommendation", "friend told me"],
  "telegram": ["telegram group", "telegram"],
  "freelancer": ["freelancer", "freelance", "upwork", "fiverr"],
  "marketing": ["marketing", "seo", "growth"],
  "finance": ["finance", "business", "money", "wealth"]
};

/* ===== LEVENSHTEIN DISTANCE (Fuzzy Matching) ===== */
function levenshtein(a, b) {
  const lenA = a.length, lenB = b.length;
  if (lenA === 0) return lenB;
  if (lenB === 0) return lenA;
  
  const matrix = Array(lenB + 1).fill(null).map(() => Array(lenA + 1).fill(0));
  for (let i = 0; i <= lenA; i++) matrix[0][i] = i;
  for (let j = 0; j <= lenB; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= lenB; j++) {
    for (let i = 1; i <= lenA; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }
  return matrix[lenB][lenA];
}

/* ===== WORD EXPANSION (Synonym + Partial Matching) ===== */
function expandWord(word) {
  word = word.toLowerCase().trim();
  const expanded = new Set([word]);
  
  // Exact key match or in synonym list
  Object.entries(SYNONYM_DICT).forEach(([key, syns]) => {
    if (key === word || syns.includes(word)) {
      expanded.add(key);
      syns.forEach(s => expanded.add(s));
    }
  });
  
  // Substring + multi-word matching
  Object.entries(SYNONYM_DICT).forEach(([key, syns]) => {
    if (key.includes(word) || word.includes(key)) expanded.add(key);
    syns.forEach(s => {
      if (s.includes(word) || word.includes(s)) expanded.add(s);
    });
  });
  
  return Array.from(expanded);
}

/* ===== UNIVERSAL TEXT EXTRACTION ===== */
function extractText(obj, depth = 0, maxDepth = 10) {
  if (depth > maxDepth) return "";
  
  // Primitive types
  if (typeof obj === "string") return obj;
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "boolean") return String(obj);
  if (obj === null || obj === undefined) return "";
  
  // Arrays: join all elements
  if (Array.isArray(obj)) {
    return obj
      .map(item => extractText(item, depth + 1, maxDepth))
      .filter(t => t.length > 0)
      .join(" ");
  }
  
  // Objects: extract from all values
  if (typeof obj === "object") {
    return Object.values(obj)
      .map(v => extractText(v, depth + 1, maxDepth))
      .filter(t => t.length > 0)
      .join(" ");
  }
  
  return "";
}

/* ===== FIND ALL SORTABLE UNITS (ANY JSON STRUCTURE) ===== */
function findAllUnits(obj, path = [], seenRefs = new WeakSet()) {
  // Prevent infinite loops with circular references
  if (typeof obj === "object" && obj !== null && seenRefs.has(obj)) {
    return [];
  }
  if (typeof obj === "object" && obj !== null) {
    seenRefs.add(obj);
  }
  
  const units = [];
  
  // CASE 1: Top-level is an array
  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => {
      if (typeof item === "object" && item !== null) {
        const keys = Object.keys(item);
        // Heuristic: likely a sortable unit if has identifier or multiple fields
        const hasIdentifier = keys.some(k => 
          /title|name|label|id|heading|app|text|content|description/i.test(k)
        );
        
        if (hasIdentifier || keys.length >= 1) {
          units.push({
            data: item,
            path: [...path, idx],
            text: extractText(item).toLowerCase(),
            originalIndex: idx,
            parentIsArray: true
          });
        }
      } else if (typeof item === "string") {
        // String in array (could be searchable)
        units.push({
          data: item,
          path: [...path, idx],
          text: item.toLowerCase(),
          originalIndex: idx,
          parentIsArray: true
        });
      }
    });
  }
  // CASE 2: Top-level is an object with nested arrays/objects
  else if (typeof obj === "object" && obj !== null) {
    Object.entries(obj).forEach(([key, val]) => {
      // If value is array, treat each element as unit
      if (Array.isArray(val)) {
        val.forEach((item, idx) => {
          if (typeof item === "object" && item !== null) {
            units.push({
              data: item,
              path: [...path, key, idx],
              text: extractText(item).toLowerCase(),
              originalIndex: idx,
              parentKey: key,
              parentIsArray: true
            });
          } else if (typeof item === "string") {
            units.push({
              data: item,
              path: [...path, key, idx],
              text: item.toLowerCase(),
              originalIndex: idx,
              parentKey: key,
              parentIsArray: true
            });
          }
        });
      }
      // If value is object, treat as unit and recurse
      else if (typeof val === "object" && val !== null) {
        units.push({
          data: val,
          path: [...path, key],
          text: extractText(val).toLowerCase(),
          parentKey: key,
          parentIsArray: false
        });
        // Recurse into nested objects (limited depth)
        if (path.length < 5) {
          units.push(...findAllUnits(val, [...path, key], seenRefs));
        }
      } else if (typeof val === "string") {
        // String values
        units.push({
          data: val,
          path: [...path, key],
          text: val.toLowerCase(),
          parentKey: key,
          parentIsArray: false
        });
      }
    });
  }
  
  return units;
}

/* ===== BUILD KEYWORD CLOUD FROM QUIZ ANSWERS ===== */
function buildKeywordCloud(answers) {
  const cloud = new Set();
  
  // Convert all answers to lowercase text
  const allText = Object.values(answers)
    .map(v => String(v).toLowerCase())
    .join(" ");
  
  // Split into words (min 2 chars to avoid noise)
  const words = allText
    .split(/[\s,;:!?.()[\]{}'"\-—–]+/)
    .filter(w => w.length >= 2);
  
  // Expand each word with synonyms
  words.forEach(word => {
    expandWord(word).forEach(expanded => cloud.add(expanded));
  });
  
  return Array.from(cloud);
}

/* ===== SEMANTIC SCORING ===== */
function semanticScore(unitText, keywordCloud) {
  if (!unitText) return 0;
  
  let score = 0;
  const unitWords = unitText
    .split(/[\s,;:!?.()[\]{}'"\-—–]+/)
    .filter(w => w.length >= 2);
  
  keywordCloud.forEach(keyword => {
    unitWords.forEach(unitWord => {
      // Exact match (highest priority)
      if (unitWord === keyword) {
        score += 15;
        return;
      }
      
      // Substring match
      if (unitWord.includes(keyword) || keyword.includes(unitWord)) {
        score += 7;
        return;
      }
      
      // Fuzzy match (Levenshtein for longer words)
      if (unitWord.length > 4 && keyword.length > 4) {
        const dist = levenshtein(unitWord, keyword);
        if (dist <= 2) score += 4;
        else if (dist <= 3) score += 2;
      }
    });
  });
  
  return score;
}

/* ===== SAFE PATH GETTER ===== */
function getByPath(obj, path) {
  let current = obj;
  for (const key of path) {
    if (current === null || current === undefined) return undefined;
    current = current[key];
  }
  return current;
}

/* ===== SAFE PATH SETTER ===== */
function setByPath(obj, path, value) {
  if (path.length === 0) return;
  
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = Array.isArray(path[i + 1]) ? [] : {};
    }
    current = current[key];
  }
  
  const lastKey = path[path.length - 1];
  current[lastKey] = value;
}

/* ===== MAIN SORTING FUNCTION ===== */
function smartSortJson(answers, jsonData, filename = "data") {
  // Guard: empty inputs
  if (!jsonData || !answers || Object.keys(answers).length === 0) {
    return {
      sorted: jsonData,
      unitCount: 0,
      topScore: 0,
      filename: filename,
      debugInfo: "No answers or data provided"
    };
  }
  
  const keywordCloud = buildKeywordCloud(answers);
  const units = findAllUnits(jsonData);
  
  if (units.length === 0) {
    return {
      sorted: jsonData,
      unitCount: 0,
      topScore: 0,
      filename: filename,
      debugInfo: "No sortable units found in data"
    };
  }
  
  // Score each unit
  const scored = units.map((u, idx) => ({
    ...u,
    _anxScore: semanticScore(u.text, keywordCloud),
    _anxIndex: idx
  }));
  
  // Sort: highest score first, then by original order
  scored.sort((a, b) => {
    if (b._anxScore !== a._anxScore) return b._anxScore - a._anxScore;
    return a._anxIndex - b._anxIndex;
  });
  
  // Deep clone to avoid mutating original
  const sortedData = JSON.parse(JSON.stringify(jsonData));
  
  // Group scored units by their parent path
  const groupedByParent = {};
  
  scored.forEach(unit => {
    if (!unit.path || unit.path.length === 0) return;
    
    // Determine parent path
    let parentPath = unit.path.slice(0, -1);
    let parentKey = parentPath.join(".");
    
    if (parentKey === "") parentKey = "_root_";
    
    if (!groupedByParent[parentKey]) {
      groupedByParent[parentKey] = {
        path: parentPath,
        items: [],
        isArray: unit.parentIsArray
      };
    }
    
    groupedByParent[parentKey].items.push(unit.data);
  });
  
  // Apply sorted items back to structure
  Object.values(groupedByParent).forEach(group => {
    if (group.path.length === 0) {
      // Root level is array
      if (Array.isArray(sortedData)) {
        sortedData.splice(0, sortedData.length, ...group.items);
      }
    } else {
      // Nested path
      let parent = getByPath(sortedData, group.path);
      
      if (parent === undefined) return;
      
      if (Array.isArray(parent)) {
        parent.splice(0, parent.length, ...group.items);
      } else if (typeof parent === "object") {
        // Parent is object, replace its array child
        const lastKey = group.path[group.path.length - 1];
        if (Array.isArray(parent[lastKey])) {
          parent[lastKey] = group.items;
        }
      }
    }
  });
  
  return {
    sorted: sortedData,
    unitCount: units.length,
    topScore: scored.length > 0 ? scored[0]._anxScore : 0,
    filename: filename,
    keywordCount: keywordCloud.length,
    keywords: keywordCloud.slice(0, 10) // Debug: top 10 keywords
  };
}

/* ===== EXPORT TO WINDOW ===== */
window.smartSortJson = smartSortJson;
window.buildKeywordCloud = buildKeywordCloud;

/* ===== SAVE ANSWERS (AUTO-CALLED BY support_boy.html) ===== */
window.saveANXAnswers = function(answers) {
  try {
    localStorage.setItem('anxAnswers', JSON.stringify(answers));
    console.log("✓ ANX Answers saved:", answers);
  } catch (e) {
    console.error("Failed to save answers:", e);
  }
};

/* ===== LOAD & AUTO-SORT (FOR libary.html) ===== */
window.loadAndSortApps = async function(jsonUrl) {
  try {
    // Get saved answers from quiz
    const savedAnswers = localStorage.getItem('anxAnswers');
    if (!savedAnswers) {
      console.warn("No quiz answers found. Load support_boy.html first.");
      return null;
    }
    
    const answers = JSON.parse(savedAnswers);
    
    // Fetch JSON data
    const res = await fetch(jsonUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const jsonData = await res.json();
    
    // Sort intelligently
    const result = smartSortJson(answers, jsonData, jsonUrl);
    
    console.log("✓ Apps sorted:", result);
    return result.sorted;
    
  } catch (e) {
    console.error("Failed to load/sort apps:", e);
    return null;
  }
};
