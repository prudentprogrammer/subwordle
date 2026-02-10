/**
 * Valid 5-letter words that can be used as guesses.
 * This is a subset of common English 5-letter words.
 */
export const VALID_GUESSES: Set<string> = new Set([
  // A
  'about', 'above', 'abuse', 'acted', 'acute', 'admit', 'adopt', 'adult', 'after', 'again',
  'agent', 'agree', 'ahead', 'aimed', 'alarm', 'album', 'alert', 'alien', 'align', 'alike',
  'alive', 'alley', 'allow', 'alone', 'along', 'alter', 'among', 'amuse', 'angel', 'anger',
  'angle', 'angry', 'anime', 'ankle', 'annex', 'antic', 'apart', 'apple', 'apply', 'arena',
  'argue', 'arise', 'armor', 'array', 'arrow', 'aside', 'asset', 'atlas', 'attic', 'audio',
  'audit', 'avoid', 'awake', 'award', 'aware', 'awful',
  // B
  'bacon', 'badge', 'badly', 'baker', 'banjo', 'basic', 'basin', 'basis', 'batch', 'beach',
  'beast', 'began', 'begin', 'being', 'below', 'bench', 'berry', 'bible', 'birth', 'black',
  'blade', 'blame', 'bland', 'blank', 'blast', 'blaze', 'bleak', 'bleed', 'blend', 'bless',
  'blind', 'block', 'blood', 'bloom', 'blown', 'blues', 'bluff', 'blunt', 'blurt', 'board',
  'boast', 'bonus', 'boost', 'booth', 'bound', 'brace', 'brain', 'brand', 'brave', 'bread',
  'break', 'breed', 'brick', 'bride', 'brief', 'bring', 'brink', 'broad', 'broke', 'brook',
  'brown', 'brush', 'buddy', 'build', 'built', 'bunch', 'burnt', 'burst', 'buyer',
  // C
  'cabin', 'cable', 'camel', 'candy', 'cargo', 'carry', 'catch', 'cause', 'cease', 'chain',
  'chair', 'chalk', 'champ', 'chaos', 'charm', 'chart', 'chase', 'cheap', 'cheat', 'check',
  'cheek', 'cheer', 'chess', 'chest', 'chief', 'child', 'chill', 'china', 'choir', 'chord',
  'chose', 'chunk', 'churn', 'cider', 'cigar', 'civic', 'civil', 'claim', 'clash', 'class',
  'clean', 'clear', 'clerk', 'click', 'cliff', 'climb', 'cling', 'clock', 'clone', 'close',
  'cloth', 'cloud', 'clown', 'coach', 'coast', 'color', 'comet', 'comic', 'coral', 'count',
  'could', 'couch', 'cough', 'court', 'cover', 'crack', 'craft', 'crane', 'crash', 'crawl',
  'crazy', 'cream', 'creek', 'creep', 'crest', 'crime', 'crisp', 'cross', 'crowd', 'crown',
  'crude', 'crush', 'curve', 'cycle',
  // D
  'daily', 'dance', 'debut', 'decay', 'delay', 'delta', 'dense', 'depth', 'derby', 'devil',
  'diary', 'dirty', 'disco', 'ditch', 'dizzy', 'dodge', 'doing', 'donor', 'doubt', 'dough',
  'draft', 'drain', 'drake', 'drama', 'drank', 'drawn', 'dread', 'dream', 'dress', 'dried',
  'drift', 'drill', 'drink', 'drive', 'drone', 'drove', 'drugs', 'drunk', 'dryer', 'dusty',
  'dwarf', 'dwell',
  // E
  'eager', 'eagle', 'early', 'earth', 'eaten', 'eight', 'elbow', 'elder', 'elect', 'elite',
  'empty', 'enemy', 'enjoy', 'enter', 'entry', 'equal', 'error', 'essay', 'event', 'every',
  'exact', 'exile', 'exist', 'extra',
  // F
  'fable', 'faint', 'fairy', 'faith', 'fancy', 'fatal', 'feast', 'fence', 'fetch', 'fever',
  'fiber', 'field', 'fiery', 'fifth', 'fifty', 'fight', 'final', 'first', 'fixed', 'flame',
  'flash', 'fleet', 'flesh', 'flick', 'flies', 'fling', 'float', 'flock', 'flood', 'floor',
  'flora', 'flour', 'fluid', 'flush', 'flute', 'focal', 'focus', 'force', 'forge', 'forth',
  'forum', 'found', 'frame', 'frank', 'fraud', 'fresh', 'front', 'frost', 'froze', 'fruit',
  'fully', 'fungi', 'funny', 'furry',
  // G
  'gauge', 'genre', 'ghost', 'giant', 'given', 'glare', 'glass', 'gleam', 'glide', 'globe',
  'gloom', 'glory', 'gloss', 'glove', 'going', 'grace', 'grade', 'grain', 'grand', 'grant',
  'grape', 'grasp', 'grass', 'grave', 'gravel','great', 'greed', 'green', 'greet', 'grief',
  'grill', 'grind', 'groan', 'groom', 'gross', 'group', 'grove', 'grown', 'guard', 'guess',
  'guest', 'guide', 'guild', 'guilt', 'guise', 'gummy',
  // H
  'habit', 'handy', 'happy', 'harsh', 'hasn', 'haste', 'haunt', 'haven', 'heart', 'heavy',
  'hedge', 'helix', 'hello', 'hence', 'herbs', 'hero', 'hinge', 'hired', 'honey', 'honor',
  'horse', 'hotel', 'house', 'human', 'humor', 'hurry',
  // I
  'ideal', 'image', 'imply', 'infer', 'indie', 'inner', 'input', 'intro', 'irony', 'ivory',
  // J
  'jewel', 'joint', 'joker', 'judge', 'juice', 'juicy', 'jumbo', 'jumps',
  // K
  'kayak', 'kebab', 'knack', 'kneel', 'knife', 'knock', 'known',
  // L
  'label', 'labor', 'lance', 'large', 'laser', 'later', 'laugh', 'layer', 'learn', 'least',
  'leave', 'legal', 'lemon', 'level', 'lever', 'light', 'limit', 'linen', 'liner', 'llama',
  'lobby', 'local', 'lodge', 'logic', 'login', 'loose', 'lorry', 'lover', 'lower', 'loyal',
  'lucky', 'lunar', 'lunch', 'lyric',
  // M
  'magic', 'major', 'maker', 'manga', 'manor', 'maple', 'march', 'marry', 'marsh', 'match',
  'mayor', 'media', 'melon', 'mercy', 'merge', 'merit', 'merry', 'metal', 'meter', 'might',
  'minor', 'minus', 'mirth', 'model', 'money', 'month', 'moral', 'motif', 'motor', 'motto',
  'mount', 'mourn', 'mouse', 'mouth', 'movie', 'muddy', 'mural', 'music', 'myrrh', 'myths',
  // N
  'naive', 'naked', 'nasty', 'naval', 'nerve', 'never', 'newly', 'niche', 'night', 'noble',
  'noise', 'north', 'noted', 'novel', 'nurse',
  // O
  'oasis', 'occur', 'ocean', 'offer', 'often', 'olive', 'onset', 'opera', 'orbit', 'order',
  'organ', 'other', 'ought', 'outer', 'owned', 'owner', 'oxide',
  // P
  'paint', 'panel', 'panic', 'paper', 'party', 'pasta', 'patch', 'pause', 'peace', 'peach',
  'pearl', 'penny', 'perch', 'phase', 'phone', 'photo', 'piano', 'piece', 'pilot', 'pinch',
  'pitch', 'pixel', 'pizza', 'place', 'plain', 'plane', 'plant', 'plate', 'plaza', 'plead',
  'pluck', 'plumb', 'plume', 'plump', 'plunge','point', 'polar', 'poser', 'pound', 'power',
  'press', 'price', 'pride', 'prime', 'print', 'prior', 'prism', 'prize', 'probe', 'proof',
  'prose', 'proud', 'prove', 'proxy', 'pulse', 'punch', 'pupil', 'purse', 'pushy',
  // Q
  'quack', 'qualm', 'quark', 'queen', 'query', 'quest', 'queue', 'quick', 'quiet', 'quilt',
  'quirk', 'quota', 'quote',
  // R
  'radar', 'radio', 'rainy', 'raise', 'rally', 'ranch', 'range', 'rapid', 'ratio', 'reach',
  'ready', 'realm', 'rebel', 'reign', 'relax', 'relay', 'renal', 'renew', 'repay', 'reply',
  'rider', 'ridge', 'rifle', 'right', 'rigid', 'risen', 'risky', 'rival', 'river', 'roast',
  'robot', 'rocky', 'rogue', 'roman', 'rough', 'round', 'route', 'royal', 'rugby', 'ruler',
  'rumor', 'rural',
  // S
  'sadly', 'saint', 'salad', 'salsa', 'salty', 'sauce', 'scale', 'scare', 'scene', 'scent',
  'scope', 'score', 'scout', 'scrap', 'serve', 'setup', 'seven', 'shade', 'shaft', 'shake',
  'shall', 'shame', 'shape', 'share', 'shark', 'sharp', 'shave', 'sheep', 'sheer', 'sheet',
  'shelf', 'shell', 'shift', 'shine', 'shirt', 'shock', 'shoot', 'shore', 'short', 'shout',
  'shown', 'shrub', 'siege', 'sight', 'sigma', 'silly', 'since', 'sixth', 'sixty', 'sized',
  'skill', 'skull', 'slash', 'slate', 'slave', 'sleep', 'slice', 'slide', 'slope', 'small',
  'smart', 'smell', 'smile', 'smoke', 'snack', 'snake', 'solar', 'solid', 'solve', 'sorry',
  'sound', 'south', 'space', 'spare', 'spark', 'speak', 'speed', 'spell', 'spend', 'spice',
  'spill', 'spine', 'spoke', 'spoon', 'sport', 'spray', 'squad', 'stack', 'staff', 'stage',
  'stain', 'stair', 'stake', 'stale', 'stalk', 'stall', 'stamp', 'stand', 'stare', 'start',
  'state', 'stave', 'stays', 'steak', 'steal', 'steam', 'steel', 'steep', 'steer', 'stern',
  'stick', 'still', 'stock', 'stole', 'stone', 'stood', 'stool', 'store', 'storm', 'story',
  'stout', 'stove', 'strap', 'straw', 'stray', 'strip', 'stuck', 'stuff', 'style', 'sugar',
  'suite', 'sunny', 'super', 'surge', 'swamp', 'swear', 'sweat', 'sweep', 'sweet', 'swept',
  'swift', 'swing', 'swirl', 'sworn', 'syrup',
  // T
  'table', 'taste', 'teach', 'teens', 'tempo', 'tends', 'tenor', 'tense', 'tenth', 'terms',
  'thank', 'theft', 'theme', 'there', 'these', 'thick', 'thief', 'thing', 'think', 'third',
  'thorn', 'those', 'three', 'threw', 'throw', 'thumb', 'tidal', 'tiger', 'tight', 'timer',
  'tired', 'title', 'toast', 'today', 'token', 'topic', 'total', 'touch', 'tough', 'towel',
  'tower', 'toxic', 'trace', 'track', 'trade', 'trail', 'train', 'trait', 'trash', 'treat',
  'trend', 'trial', 'tribe', 'trick', 'tried', 'troop', 'trout', 'truck', 'truly', 'trump',
  'trunk', 'trust', 'truth', 'tulip', 'tumor', 'tuner', 'turns', 'tutor', 'twice', 'twist',
  // U
  'ultra', 'uncle', 'under', 'unify', 'union', 'unite', 'unity', 'until', 'upper', 'upset',
  'urban', 'usage', 'usual', 'utter',
  // V
  'vague', 'valid', 'valve', 'vapor', 'vault', 'verse', 'vigor', 'vinyl', 'viral', 'virus',
  'visit', 'vista', 'vital', 'vivid', 'vocal', 'vodka', 'voice', 'voter', 'vouch',
  // W
  'wages', 'watch', 'water', 'weary', 'weave', 'wedge', 'weird', 'whale', 'wheat', 'wheel',
  'where', 'which', 'while', 'white', 'whole', 'whose', 'widen', 'width', 'witch', 'woman',
  'world', 'worry', 'worse', 'worst', 'worth', 'would', 'wound', 'wrath', 'write', 'wrong',
  'wrote',
  // X-Y-Z
  'xenon', 'yacht', 'yield', 'young', 'youth', 'zebra', 'zesty',
]);

/**
 * Answer words organized by category.
 * These are the words that can be selected as daily answers.
 */
export const ANSWERS: Record<string, string[]> = {
  general: [
    'about', 'above', 'adult', 'after', 'again', 'agent', 'agree', 'ahead', 'allow', 'along',
    'anger', 'apple', 'arena', 'argue', 'arise', 'avoid', 'awake', 'award', 'basic', 'beach',
    'begin', 'being', 'below', 'birth', 'black', 'blame', 'blank', 'blast', 'blend', 'blind',
    'block', 'blood', 'board', 'bonus', 'bound', 'brain', 'brand', 'brave', 'break', 'brief',
    'bring', 'broad', 'broke', 'brown', 'brush', 'build', 'built', 'bunch', 'carry', 'catch',
    'cause', 'chain', 'chair', 'chase', 'cheap', 'check', 'chief', 'child', 'civil', 'claim',
    'class', 'clean', 'clear', 'climb', 'clock', 'close', 'cloud', 'coach', 'coast', 'could',
    'count', 'court', 'cover', 'crack', 'craft', 'crash', 'crazy', 'cream', 'crime', 'cross',
    'crowd', 'crown', 'cycle', 'daily', 'dance', 'death', 'delay', 'depth', 'dirty', 'doubt',
    'draft', 'drain', 'drama', 'dream', 'dress', 'drift', 'drink', 'drive', 'drove', 'dusty',
    'eager', 'early', 'earth', 'eight', 'elite', 'empty', 'enemy', 'enjoy', 'enter', 'equal',
    'error', 'essay', 'event', 'every', 'exact', 'exist', 'extra', 'faint', 'faith', 'fancy',
    'fatal', 'feast', 'fence', 'fiber', 'field', 'fifth', 'fifty', 'fight', 'final', 'first',
    'fixed', 'flame', 'flash', 'float', 'flood', 'floor', 'fluid', 'focus', 'force', 'forth',
    'forum', 'found', 'frame', 'fraud', 'fresh', 'front', 'frost', 'fruit', 'fully', 'funny',
    'ghost', 'giant', 'given', 'glass', 'globe', 'glory', 'grace', 'grade', 'grain', 'grand',
    'grant', 'grasp', 'grass', 'grave', 'great', 'green', 'grind', 'group', 'grown', 'guard',
    'guess', 'guest', 'guide', 'guilt', 'happy', 'harsh', 'heart', 'heavy', 'hello', 'hence',
    'horse', 'hotel', 'house', 'human', 'humor', 'hurry', 'ideal', 'image', 'imply', 'inner',
    'input', 'irony', 'joint', 'judge', 'juice', 'knife', 'knock', 'known', 'label', 'large',
    'later', 'laugh', 'layer', 'learn', 'least', 'leave', 'legal', 'level', 'light', 'limit',
    'local', 'logic', 'loose', 'lover', 'lower', 'loyal', 'lucky', 'lunch', 'magic', 'major',
    'maker', 'march', 'match', 'mayor', 'media', 'mercy', 'merit', 'metal', 'might', 'minor',
    'model', 'money', 'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'movie', 'music',
    'naive', 'nerve', 'never', 'newly', 'night', 'noble', 'noise', 'north', 'noted', 'novel',
    'nurse', 'occur', 'ocean', 'offer', 'often', 'order', 'other', 'ought', 'outer', 'owner',
    'paint', 'panel', 'panic', 'paper', 'party', 'patch', 'pause', 'peace', 'phase', 'phone',
    'photo', 'piece', 'pilot', 'pitch', 'place', 'plain', 'plane', 'plant', 'plate', 'plead',
    'point', 'polar', 'pound', 'power', 'press', 'price', 'pride', 'prime', 'print', 'prior',
    'prize', 'proof', 'proud', 'prove', 'pulse', 'punch', 'queen', 'query', 'quest', 'quick',
    'quiet', 'quote', 'radar', 'radio', 'raise', 'rally', 'ranch', 'range', 'rapid', 'ratio',
    'reach', 'ready', 'realm', 'reign', 'relax', 'renew', 'reply', 'rider', 'right', 'rigid',
    'risky', 'rival', 'river', 'robot', 'rocky', 'rough', 'round', 'route', 'royal', 'ruler',
    'rumor', 'rural', 'saint', 'scale', 'scare', 'scene', 'scope', 'score', 'sense', 'serve',
    'seven', 'shade', 'shake', 'shall', 'shame', 'shape', 'share', 'sharp', 'shave', 'shelf',
    'shift', 'shine', 'shirt', 'shock', 'shoot', 'shore', 'short', 'shout', 'shown', 'sight',
    'silly', 'since', 'sixth', 'sixty', 'skill', 'slate', 'sleep', 'slice', 'slide', 'slope',
    'small', 'smart', 'smell', 'smile', 'smoke', 'solar', 'solid', 'solve', 'sorry', 'sound',
    'south', 'space', 'spare', 'spark', 'speak', 'speed', 'spell', 'spend', 'spoke', 'sport',
    'spray', 'squad', 'stack', 'staff', 'stage', 'stain', 'stake', 'stand', 'stare', 'start',
    'state', 'steal', 'steam', 'steel', 'steep', 'stern', 'stick', 'still', 'stock', 'stone',
    'stood', 'store', 'storm', 'story', 'strap', 'strip', 'stuck', 'stuff', 'style', 'sugar',
    'suite', 'super', 'surge', 'swear', 'sweet', 'swept', 'swift', 'swing', 'table', 'taste',
    'teach', 'thank', 'theme', 'there', 'thick', 'thief', 'thing', 'think', 'third', 'those',
    'three', 'throw', 'tight', 'timer', 'tired', 'title', 'toast', 'today', 'token', 'topic',
    'total', 'touch', 'tough', 'tower', 'trace', 'track', 'trade', 'trail', 'train', 'trait',
    'trash', 'treat', 'trend', 'trial', 'tribe', 'trick', 'tried', 'troop', 'truck', 'truly',
    'trunk', 'trust', 'truth', 'twice', 'twist', 'ultra', 'uncle', 'under', 'union', 'unite',
    'unity', 'until', 'upper', 'upset', 'urban', 'usual', 'utter', 'valid', 'value', 'verse',
    'vigor', 'viral', 'virus', 'visit', 'vital', 'vivid', 'voice', 'watch', 'water', 'weird',
    'whale', 'wheat', 'wheel', 'where', 'which', 'while', 'white', 'whole', 'whose', 'width',
    'woman', 'world', 'worry', 'worse', 'worst', 'worth', 'would', 'wound', 'write', 'wrong',
    'wrote', 'yield', 'young', 'youth',
  ],

  food: [
    'apple', 'bacon', 'basil', 'berry', 'bread', 'broth', 'candy', 'cheese','cider', 'cream',
    'crepe', 'crisp', 'crumb', 'curry', 'dough', 'feast', 'flour', 'froze', 'fruit', 'fudge',
    'glaze', 'grain', 'grape', 'gravy', 'grill', 'guava', 'honey', 'icing', 'jelly', 'juice',
    'kebab', 'lemon', 'lunch', 'maple', 'melon', 'mince', 'mocha', 'olive', 'onion', 'pasta',
    'peach', 'pearl', 'pizza', 'plate', 'plumb', 'poach', 'roast', 'salad', 'salsa', 'salty',
    'sauce', 'savor', 'scone', 'slice', 'snack', 'spice', 'spoon', 'steak', 'stove', 'sugar',
    'sweet', 'syrup', 'table', 'taste', 'toast', 'trout', 'wheat', 'yeast', 'zesty',
  ],

  tech: [
    'admin', 'alert', 'array', 'audio', 'batch', 'bytes', 'cable', 'cache', 'chain', 'chips',
    'click', 'clone', 'cloud', 'codec', 'coder', 'crash', 'cycle', 'debug', 'drive', 'drone',
    'email', 'error', 'fiber', 'flash', 'float', 'frame', 'graph', 'input', 'layer', 'linux',
    'login', 'logic', 'macro', 'media', 'merge', 'model', 'modem', 'mouse', 'nodes', 'parse',
    'patch', 'pixel', 'print', 'proxy', 'query', 'queue', 'radar', 'react', 'robot', 'route',
    'scale', 'setup', 'shell', 'shift', 'smart', 'solid', 'stack', 'store', 'style', 'super',
    'table', 'timer', 'token', 'tools', 'trace', 'ultra', 'unity', 'valid', 'video', 'viral',
    'virus', 'watch', 'write',
  ],

  sports: [
    'arena', 'badge', 'bench', 'block', 'catch', 'champ', 'chase', 'clash', 'climb', 'coach',
    'court', 'derby', 'draft', 'drill', 'drive', 'diver', 'fence', 'field', 'final', 'fling',
    'force', 'games', 'goals', 'guard', 'hiker', 'match', 'medal', 'mount', 'omega', 'pitch',
    'point', 'punch', 'queen', 'racer', 'rally', 'rider', 'rival', 'round', 'rugby', 'score',
    'scout', 'serve', 'skate', 'skill', 'slash', 'speed', 'sport', 'squad', 'staff', 'stake',
    'steer', 'stick', 'sweep', 'swing', 'teams', 'tempo', 'throw', 'timer', 'title', 'track',
    'trail', 'train', 'vault', 'vigor',
  ],

  science: [
    'adapt', 'alloy', 'amino', 'angle', 'atlas', 'atoms', 'basis', 'bonds', 'brain', 'cells',
    'chaos', 'chart', 'clone', 'comet', 'coral', 'cycle', 'datum', 'decay', 'delta', 'dense',
    'depth', 'earth', 'field', 'flame', 'flora', 'fluid', 'focal', 'force', 'fungi', 'gauge',
    'genes', 'globe', 'graph', 'helix', 'laser', 'layer', 'light', 'lunar', 'magma', 'meter',
    'model', 'molar', 'nerve', 'noble', 'orbit', 'organ', 'oxide', 'ozone', 'phase', 'plane',
    'plant', 'polar', 'prism', 'probe', 'pulse', 'quark', 'radar', 'ratio', 'renal', 'rigid',
    'scale', 'sigma', 'solar', 'solid', 'space', 'spine', 'steam', 'steel', 'surge', 'tidal',
    'toxic', 'trace', 'tumor', 'ultra', 'vapor', 'vital', 'waves', 'xenon',
  ],

  movies: [
    'actor', 'award', 'black', 'cable', 'chase', 'crowd', 'drama', 'dream', 'elite', 'extra',
    'fable', 'fairy', 'feast', 'fight', 'flame', 'ghost', 'glory', 'grave', 'guard', 'guest',
    'guide', 'heist', 'homer', 'honor', 'image', 'intro', 'joker', 'judge', 'light', 'magic',
    'manor', 'mayor', 'media', 'model', 'movie', 'night', 'noble', 'novel', 'opera', 'oscar',
    'panel', 'pilot', 'place', 'plaza', 'prime', 'queen', 'quest', 'realm', 'rebel', 'reign',
    'rival', 'robin', 'rocky', 'rogue', 'roman', 'royal', 'ruler', 'saint', 'scene', 'scout',
    'shown', 'siege', 'slate', 'stage', 'stare', 'story', 'stunt', 'super', 'theme', 'thief',
    'title', 'tower', 'trail', 'tribe', 'trick', 'troop', 'vault', 'villain','voice', 'witch',
  ],

  music: [
    'album', 'banjo', 'beats', 'bells', 'blues', 'brass', 'break', 'chord', 'clang', 'dance',
    'drums', 'flute', 'genre', 'grace', 'group', 'growl', 'guild', 'hooks', 'hymns', 'indie',
    'ivory', 'jingle','lyric', 'major', 'march', 'media', 'metal', 'meter', 'minor', 'motif',
    'music', 'notes', 'opera', 'organ', 'party', 'piano', 'pitch', 'power', 'pulse', 'queen',
    'radio', 'rally', 'range', 'remix', 'rider', 'rinse', 'round', 'scale', 'score', 'sharp',
    'shout', 'snare', 'songs', 'sound', 'stage', 'stave', 'steel', 'still', 'stone', 'strum',
    'style', 'swing', 'tempo', 'tenor', 'tones', 'track', 'train', 'tribe', 'tunes', 'twist',
    'verse', 'vigor', 'vinyl', 'viola', 'vocal', 'voice',
  ],
};

// Add all answer words to valid guesses so they're always accepted
for (const words of Object.values(ANSWERS)) {
  for (const word of words) {
    VALID_GUESSES.add(word);
  }
}

export function isValidWord(word: string): boolean {
  return VALID_GUESSES.has(word.toLowerCase());
}

export function getAnswerWords(category: string): string[] {
  const words = ANSWERS[category];
  if (words !== undefined) return words;
  return ANSWERS['general'] ?? [];
}
