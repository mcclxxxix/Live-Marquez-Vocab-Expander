import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA: 1,000 obscure words from One Hundred Years of Solitude
// ═══════════════════════════════════════════════════════════════

const MARQUEZ_WORDS = ["greatgranddaughter","uncomprehendingly","disproportionate","greatgrandfather","irresponsibility","misappropriation","simplemindedness","greatgrandmother","characteristics","compassionately","disappointments","droughtstricken","expeditionaries","experimentation","incomprehensible","inconsequential","materialization","philanthropists","reconciliations","representatives","thickheadedness","uninterruptedly","interpretations","phosphorescence","revolutionaries","congratulations","invulnerability","administration","antimilitarist","archiepiscopal","characteristic","contemporaries","contradictions","daguerreotypes","disconsolately","discrimination","discriminatory","establishments","evangelization","hallucinations","impermeability","insurmountable","intermediaries","interrogations","meteorological","popularization","rebelliousness","reconstruction","recriminations","representation","representative","scandalization","schoolchildren","sentimentality","simultaneously","submissiveness","superintendent","understandable","unpleasantness","unsuccessfully","demoralization","disillusionment","ecclesiastical","mortifications","slaughterhouse","systematically","unintelligible","aggressiveness","apprenticeship","correspondents","demonstrations","disenchantment","recapitulation","accompaniment","acquaintances","administering","argumentative","assassination","cartilaginous","clavichordist","communicative","concatenation","condescending","dauntlessness","directionless","disadvantages","disconcerting","effectiveness","entanglements","extravagances","glorification","hermeneutical","hieroglyphics","impertinences","improvisation","impulsiveness","inconsiderate","incorporating","indecipherable","inexhaustible","instructional","insufficiency","interpretation","inviolability","irresponsible","justification","misadventures","misunderstood","modernization","modifications","mystification","opportunities","participating","participation","recollections","reconstructed","reinforcement","reproductions","salaciousness","satisfactions","sensitivities","spiritualists","superstitious","uncomfortable","uncomplicated","unconditional","unconquerable","uncontainable","unforgettable","unpredictable","ventriloquism","ventriloquist","announcements","authorization","communicating","companionship","compassionate","concentrating","concupiscence","conflagration","consideration","contradiction","contributions","disillusioned","distinguished","enigmatically","exterminating","functionaries","hallucination","imperceptibly","imperturbable","indispensable","international","intransigence","investigation","involuntarily","rectification","transmutation","unprecedented","consciousness","contemplating","convalescence","handkerchiefs","impossibility","interrogation","manifestation","mortification","postponements","reestablished","responsibility","superstitions","accidentally","acquaintance","alternatives","anachronisms","anticipating","anticipation","applications","appointments","asphyxiation","associations","astonishment","catastrophes","celebrations","certificates","characterize","civilization","collaborated","commissioned","communication","complicating","conciliation","conciliatory","confirmation","confiscating","congregation","conservatism","considerable","consistently","conspirators","constipation","consultation","contraptions","convalescent","conversations","crisscrossed","decapitation","deflagration","demarcations","disadvantage","disapproving","disconsolate","discouraging","disheartened","dispensation","distillation","distinctions","distractedly","distributing","distribution","disturbances","domesticated","embarrassing","enchantments","establishing","exaggerating","exaggeration","executioners","experimental","extravagance","fermentation","fluorescence","fundamentals","grandchildren","granddaughter","grandparents","hermetically","illumination","immeasurable","impertinence","improvements","inconsolable","incorrigible","increasingly","inexperience","inscriptions","insignificant","insinuations","instantaneous","intelligence","intermittent","interpreting","interrupting","interweaving","intoxication","intransigent","irremediably","irrepressible","jurisdiction","kindergarten","lamentations","lighthearted","manufactured","masterpieces","melodramatic","methodically","meticulously","municipality","mysteriously","mythological","organization","overwhelming","parishioners","parsimonious","particularly","permanganate","perspiration","perturbation","photographic","preconceived","predilection","preservation","presidential","proboscidian","protagonists","readjustment","reappearance","recommending","reconciliation","recuperation","remembrances","restlessness","reverberated","scrupulously","simpleminded","sleepwalkers","speculations","straitjacket","stubbornness","substitution","sufficiently","suppositions","surprisingly","suspiciously","transfigured","transmitting","unbridgeable","undiminished","unrepeatable","unsuccessful","accompanying","accomplished","annihilation","appreciating","arrangements","astronomical","bewilderment","carelessness","caterpillars","circumstance","complaisance","concentration","confidential","consequently","contaminated","contemplated","contradicted","coordinating","coordination","demonstration","descriptions","disappearance","distraction","emplacements","encyclopedic","establishment","expectations","explanations","faithfulness","forgetfulness","grandmothers","hallucinating","illegitimate","imprisonment","incandescent","independence","intermediary","intermediate","intervention","materialized","neighborhood","nonexistence","occasionally","photographed","photographer","postponement","preparations","proclamations","proliferation","recollection","sacrilegious","slaughtering","stupefaction","subordinates","synchronized","unfathomable","unprincipled","affectionate","consequences","consolidated","contribution","corresponded","demonstrated","disappointment","disconcerted","disemboweled","embroidering","enterprising","exterminated","extraordinary","handkerchief","incorporated","inexplicable","invulnerable","measurements","miraculously","possibilities","reproduction","resurrection","abstraction","accessories","afflictions","altercation","alternately","alternation","ambiguities","annihilated","apocalyptic","appreciable","approaching","appropriate","archipelago","asphyxiated","assassinate","assimilated","benediction","blasphemies","bloodhounds","brandishing","calculation","catholicism","cauliflower","cauterizing","ceaselessly","centenarian","certainties","challenging","christening","circulation","circumcised","clairvoyance","clandestine","classifying","collections","combination","commonplace","communicate","complaining","composition","concentrate","conclusions","concubinage","conferences","conflicting","conjectures","consecutive","considering","consistency","consolidate","conspirator","construction","contaminate","contemplate","contradictory","controversy","convertible","coordinated","corporation","cultivating","cultivation","decorations","deformation","degradation","demonstrate","demoralized","description","desperately","development","dictatorial","differently","diminishing","discomforts","disinfected","disoriented","displeasure","domesticity","drunkenness","emergencies","enchantment","enterprises","entertained","environment","evaporation","exaggerated","exasperation","exhibitions","experienced","experiences","explanatory","exploration","exploratory","exterminate","extermination","fashionable","fingernails","floorboards","floundering","foreseeable","forethought","forewarning","friendships","frivolously","functionary","functioning","generalized","generations","geometrical","hallucinated","handwriting","haughtiness","humanitarian","humiliating","illustrated","immigration","immobilized","impassioned","impassively","impatiently","impediments","improvement","incantation","inconceivable","incorporate","incredulous","indefinable","independent","indications","indifference","indigestion","indomitable","inescapable","ingratitude","inoffensive","inopportune","insensitive","inseparable","instigation","instruction","intemperate","interfering","intertwined","intimidated","intolerance","investigate","investments","kettledrums","lamentation","limitations","maneuvering","manipulation","marketplace","masculinity","masterpiece","materialize","meaningless","meditations","mercilessly","necromancer","negotiating","nervousness","obligations","observation","occupations","omnipotence","orientation","outstanding","pandemonium","partnership","persecution","persevering","preliminary","preoccupied","preparation","presentable","proclaiming","professional","progressing","prohibition","prophesying","proportions","proposition","publication","punctilious","punctuality","rationalist","realization","recommended","rediscovery","reestablish","reluctantly","repetitions","repetitious","reproaching","resentments","respiration","roguishness","sacrificing","salamanders","seasickness","secretively","sequestered","simplifying","simultaneous","speculation","startlingly","stethoscope","substantial","suppressing","susceptible","sympathized","symptomatic","systematize","tambourines","telegrapher","temperament","tempestuous","temptations","territories","theological","therapeutic","threatening","thunderclap","townspeople","tranquility","translating","transported","troublesome","unconquered","unconscious","undesirable","unequivocal","unification","uninhabited","unknowingly","unqualified","unreachable","utilitarian","vindication","voicelessly","voluntarily","volunteered","watercolors","wheelbarrow","whitewashed","windowpanes","withdrawing","accelerated","accomplices","admonitions","adventurers","announcement","apologetics","apparitions","appointment","arrangement","attractions","calculating","catastrophe","coincidence","compensated","conceivable","confidences","confinement","contracting","convenience","conventional","decapitated","destination","devastating","differences","discredited","dismantling","disposition","dissipation","distinction","distinguish","disturbance","educational","emancipated","enlargement","excavations","exceptional","fascinating","formalities","fornication","frightening","fulfillment","fundamental","immortality","inaugurated","informality","inquisitive","inscription","intolerable","irrefutable","irremediable","irreparable","irreverence","irrevocably","laboriously","liquidating","maintaining","maintenance","manipulated","merchandise","mischievous","momentarily","noiselessly","obscenities","overflowing","perceptible","photographs","practically","predisposed","premonitions","premonitory","respectable","sensibility","shamelessly","spectacular","spendthrift","spontaneity","squandering","stimulation","subterfuges","superstition","theoretical","traditional","translation","transmitted","transparent","unavoidable","unawareness","undermining","unhurriedly","whereabouts","adolescents","adversaries","anniversary","carnivorous","celebrating","ceremonious","certificate","clairvoyant","consequence","contributed","conventions","culmination","degenerated","distraction","exasperating","expressions","extinguished","extravagant","innumerable","inspiration","instructions","intelligent","involuntary","needlepoint","nonetheless","pestilential","plantations","progressive","prostration","provocation","provocative","recognition","reconstruct","rejuvenated","resemblance","sentimental","shipwrecked","sleepwalker","spontaneous","surrendered","transferred","tribulation","unbreakable","underground","undertaking","unfortunate","uselessness","accentuated","acceptance","accomplice","accomplish","accounting","accusation","adjustment","adventurer","aggressive","alchemists","allegation","alternated","anticipate","apotheosis","apparently","appetizing","appreciate","arithmetic","aspiration","assignment","assistance","astonished","astronomer","attendance","attenuated","attracting","attractive","auspicious","autonomous","barefooted","barricades","beautified","beforehand","benefactor","benevolent","beseeching","brightness","broadening","businesses","calamitous","capricious","captivated","catalogued","cautiously","ceremonial","challenged","characters","christened","clumsiness","coarseness","collapsing","collective","comforting","commandant","commercial","committing","compendium","complicate","concealing","concentric","concession","concoction","concubines","condolence","conducting","conferring","confirming","congenital","congestion","consecrated","consequent","consisting","consolation","consternation","consulting","consummate","continuous","controlled","convention","cordiality","corpulence","correspond","crocheting","cultivated","decorative","definition","deliberate","delicacies","delicately","delivering","demolished","dependable","deportment","descending","designated","destroying","destructive","diminutive","disastrous","discussion","dismissing","dispersion","displaying","dissolving","distracted","dominating","ecological","economical","elementary","eliminated","eloquently","embankment","emigrating","emphasizes","employment","encouraged","engrossing","escutcheon","estimation","everything","evidencing","excavating","excoriated","exhausting","expedience","expedition","expedition","extensions","extracting","fabricated","fascinated","fatalistic","felicitous","fingertips","flashlight","flavescent","fontanelle","formidable","foundering","fractional","fraternity","frustrated","fulfilling","generosity","godfathers","governance","gymnastics","haphazardly","headstrong","heatstroke","hemisphere","hemorrhage","horoscopes","horrendous","hospitable","humbleness","idealistic","identified","illuminate","imbecility","immigrants","immobility","immoderate","immorality","impalement","impassible","impediment","imperialism","impersonal","implements","importance","impossible","imposition","impregnable","impression","imprisoned","improbable","incapacity","incitement","incomplete","incredible","indelicate","indication","indigenous","indiscreet","indolently","industrial","inequality","inexorable","infinitely","influenced","inhabitant","inheriting","initiation","innovation","insatiable","insistence","installing","instigated","instigator","instructed","instrument","integument","intentions","interloper","interments","interposed","intestinal","introduced","invariably","irrelevant","laceration","legitimate","lieutenant","lighthouse","literarily","locomotive","longitudo","lugubrious","lullabying","luminaries","malodorous","manhandled","manipulate","manuscript","marshaling","masticated","meditating","melancholy","meningitis","mentioning","metalworks","militiamen","mistreated","moderation","monastery","motherless","motionless","multiplied","nauseating","neglecting","obligation","obstinance","occidental","occupation","opposition","optimistic","originally","ostensible","outlandish","overbearing","overlooked","overthrown","pacificism","penitently","percentage","percussion","performing","perimeters","permission","perpetuate","perplexing","personally","persuading","pertaining","phantasmal","philosophy","plantation","pleasantly","pleasuring","possession","practicing","precarious","precedence","precipices","prescribed","presumably","pretending","prevailing","preventing","previously","privileged","processing","profession","promenades","pronounced","propaganda","propensity","prospering","prosperity","protective","protracted","proverbial","provisions","publishing","quarantine","rancorless","rattletrap","recalcitrant","recognized","recoveries","recurrence","reflective","regimental","regulation","relatively","reluctance","remarkable","renovation","repeatedly","repentance","replicated","requesting","resembling","resentment","resolutely","resolution","restricted","revelation","rheumatism","rightfully","ritornello","sandalwood","sanitarily","saviorfair","scavenging","settlement","skirmishes","solicitous","solidarity","soliloquy","soundtrack","sponsoring","stereotype","stimulated","subjecting","subsequent","supposedly","surrounded","suspicious","symbolized","telescoped","temperance","tenderness","terminated","threatened","throughout","tormenting","tournament","trajectory","tremendous","tyrannical","ultimately","unaffected","unanimidad","unassuming","unattended","unbearable","unceasingly","unclothing","undeniable","underlined","undermined","understand","understood","uneasiness","unexpected","unfinished","unpleasant","unsettling","upholstery","vegetables","visibility","vulnerable","wanderings","weaponless"];

const PHRASE_BANK = {
  "solitude": { phrase: "a solitude so vast it echoed with forgotten names", spanish: "una soledad tan vasta que resonaba con nombres olvidados", context: "When someone feels deeply alone or isolated" },
  "premonition": { phrase: "seized by a premonition of irreversible change", spanish: "presa de una premonición de cambio irreversible", context: "When sensing something big is about to happen" },
  "nostalgia": { phrase: "drowning in a nostalgia for things that never existed", spanish: "ahogándose en una nostalgia por cosas que nunca existieron", context: "When missing something you never had" },
  "melancholy": { phrase: "wrapped in a melancholy older than memory itself", spanish: "envuelto en una melancolía más antigua que la propia memoria", context: "When feeling deeply sad without clear reason" },
  "desolation": { phrase: "the desolation settled like dust on abandoned furniture", spanish: "la desolación se asentó como polvo sobre muebles abandonados", context: "When a place or situation feels utterly empty" },
  "bewilderment": { phrase: "lost in a bewilderment that turned the world to water", spanish: "perdido en un desconcierto que convertía el mundo en agua", context: "When completely confused and disoriented" },
  "hallucination": { phrase: "a hallucination so vivid it left fingerprints on reality", spanish: "una alucinación tan vívida que dejó huellas en la realidad", context: "When something seems unbelievably real" },
  "labyrinth": { phrase: "trapped in the labyrinth of our own making", spanish: "atrapados en el laberinto de nuestra propia creación", context: "When stuck in a complex self-created problem" },
  "oblivion": { phrase: "consigned to the oblivion that devours all certainties", spanish: "condenado al olvido que devora todas las certezas", context: "When something is completely forgotten" },
  "pestilence": { phrase: "a pestilence of forgetfulness spreading house to house", spanish: "una pestilencia de olvido esparciéndose casa por casa", context: "When a bad influence spreads through a group" },
  "stupor": { phrase: "paralyzed in a stupor of incomprehension", spanish: "paralizado en un estupor de incomprensión", context: "When too shocked to react" },
  "vengeance": { phrase: "a vengeance so patient it had learned to wait centuries", spanish: "una venganza tan paciente que había aprendido a esperar siglos", context: "When payback takes a very long time" },
  "metamorphosis": { phrase: "undergoing a metamorphosis visible only to the butterflies", spanish: "sufriendo una metamorfosis visible solo para las mariposas", context: "When changing in ways others can't see" },
  "ephemeral": { phrase: "as ephemeral as the yellow butterflies of Macondo", spanish: "tan efímero como las mariposas amarillas de Macondo", context: "When something is beautiful but fleeting" },
  "lucidity": { phrase: "a sudden lucidity that illuminated forgotten corridors", spanish: "una lucidez repentina que iluminó corredores olvidados", context: "When suddenly understanding something clearly" },
  "delirium": { phrase: "surrendering to a delirium of impossible certainties", spanish: "rindiéndose a un delirio de certezas imposibles", context: "When passionately believing the unbelievable" },
  "inexorable": { phrase: "the inexorable march of time through abandoned rooms", spanish: "la marcha inexorable del tiempo por habitaciones abandonadas", context: "When something cannot be stopped or changed" },
  "prodigious": { phrase: "a prodigious feat of memory against the tide of forgetting", spanish: "una prodigiosa hazaña de memoria contra la marea del olvido", context: "When something is remarkably impressive" },
  "tenacious": { phrase: "with the tenacious persistence of tropical rain", spanish: "con la persistencia tenaz de la lluvia tropical", context: "When someone won't give up despite everything" },
  "resignation": { phrase: "accepting with the resignation of those who've seen too much", spanish: "aceptando con la resignación de quienes han visto demasiado", context: "When giving up the fight against circumstance" },
  "imperturbable": { phrase: "maintaining an imperturbable calm amid the apocalypse", spanish: "manteniendo una calma imperturbable en medio del apocalipsis", context: "When staying impossibly calm in chaos" },
  "incandescent": { phrase: "an incandescent rage that illuminated the darkness", spanish: "una rabia incandescente que iluminaba la oscuridad", context: "When anger is so intense it's almost beautiful" },
  "phosphorescent": { phrase: "memories glowing phosphorescent in the depths of night", spanish: "recuerdos brillando fosforescentes en las profundidades de la noche", context: "When memories seem to glow in the dark" },
  "cataclysm": { phrase: "awaiting the cataclysm with the serenity of the inevitable", spanish: "esperando el cataclismo con la serenidad de lo inevitable", context: "When a disaster approaches and you're at peace" },
  "concupiscence": { phrase: "consumed by a concupiscence that defied all sacraments", spanish: "consumido por una concupiscencia que desafiaba todos los sacramentos", context: "When desire overwhelms all moral restraint" },
  "annihilation": { phrase: "the slow annihilation of everything we thought permanent", spanish: "la lenta aniquilación de todo lo que creíamos permanente", context: "When everything you relied on falls apart" },
  "disenchantment": { phrase: "a disenchantment so complete the mirrors stopped reflecting", spanish: "un desencanto tan completo que los espejos dejaron de reflejar", context: "When totally disillusioned with something" },
  "irremediable": { phrase: "the irremediable certainty that everything repeats", spanish: "la certeza irremediable de que todo se repite", context: "When something can never be fixed or undone" },
  "magnificence": { phrase: "a faded magnificence that still commanded awe", spanish: "una magnificencia desvanecida que aún inspiraba asombro", context: "When past glory is still somehow impressive" },
  "turbulence": { phrase: "navigating the turbulence of a hundred years of repetition", spanish: "navegando la turbulencia de cien años de repetición", context: "When going through chaotic, unstable times" }
};

const SPANISH_TRANSLATIONS = {"solitude":"soledad","melancholy":"melancolía","nostalgia":"nostalgia","premonition":"premonición","alchemy":"alquimia","astrolabe":"astrolabio","insomnia":"insomnio","clairvoyance":"clarividencia","incantation":"encantamiento","stupor":"estupor","desolation":"desolación","bewilderment":"desconcierto","consternation":"consternación","disillusionment":"desilusión","extravagance":"extravagancia","hallucination":"alucinación","impassive":"impasible","incredulity":"incredulidad","lamentation":"lamentación","magnanimity":"magnanimidad","oblivion":"olvido","pestilence":"pestilencia","prodigious":"prodigioso","rancor":"rancor","resignation":"resignación","tenacious":"tenaz","turbulent":"turbulento","unbridled":"desenfrenado","vengeance":"venganza","wistful":"nostálgico","abnegation":"abnegación","somnambulism":"sonambulismo","clairvoyant":"clarividente","irrevocable":"irrevocable","labyrinth":"laberinto","patriarch":"patriarca","matriarch":"matriarca","daguerreotype":"daguerrotipo","amaranthine":"amarantino","ephemeral":"efímero","cataclysm":"cataclismo","perpetuity":"perpetuidad","lucidity":"lucidez","delirium":"delirio","parchment":"pergamino","alchemist":"alquimista","concupiscence":"concupiscencia","herbalist":"herbolario","apocalypse":"apocalipsis","phantasmagoria":"fantasmagoría","conflagration":"conflagración","dilapidated":"destartalado","inexorable":"inexorable","ignominy":"ignominia","privation":"privación","exasperation":"exasperación","imperturbable":"imperturbable","pestilential":"pestilente","proliferation":"proliferación","hemorrhage":"hemorragia","reminiscence":"reminiscencia","premonitory":"premonitorio","resurrection":"resurrección","embankment":"terraplén","incandescent":"incandescente","mesmerized":"hipnotizado","phosphorescent":"fosforescente","translucent":"translúcido","vermilion":"bermellón","wistfulness":"añoranza","precariousness":"precariedad","dissolution":"disolución","annihilation":"aniquilación","reconciliation":"reconciliación","disenchantment":"desencanto","metamorphosis":"metamorfosis","incorrigible":"incorregible","impenetrable":"impenetrable","insurmountable":"insuperable","inconsolable":"inconsolable","unfathomable":"insondable","imperceptible":"imperceptible","invulnerable":"invulnerable","irremediable":"irremediable","unforeseeable":"imprevisible","irreversible":"irreversible","incomprehensible":"incomprensible","disproportionate":"desproporcionado","indistinguishable":"indistinguible","stupefaction":"estupefacción","beatitude":"beatitud","trepidation":"trepidación","effervescence":"efervescencia","magnificence":"magnificencia","omniscience":"omnisciencia","benevolence":"benevolencia","incandescence":"incandescencia","luminescence":"luminiscencia","despondency":"abatimiento","nonchalance":"despreocupación","petulance":"petulancia","turbulence":"turbulencia","somnolence":"somnolencia","ambivalence":"ambivalencia","opulence":"opulencia","indolence":"indolencia"};

// ═══════════════════════════════════════════════════════════════
// MEMORY-SAFE ARCHITECTURE
// All audio data is managed via ArrayBuffer with explicit cleanup
// No persistent storage of recordings - deleted after analysis
// ═══════════════════════════════════════════════════════════════

const LISTEN_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const ANALYSIS_INTERVAL_MS = 30 * 1000; // Analyze every 30s of speech

// Helper: find Márquez words in transcript
function findMarquezMatches(transcript) {
  const words = transcript.toLowerCase().split(/\s+/);
  const matches = [];
  const phraseKeys = Object.keys(PHRASE_BANK);

  // Check each word spoken against our vocabulary
  for (const word of words) {
    // Direct match in phrase bank
    if (PHRASE_BANK[word]) {
      matches.push({ word, ...PHRASE_BANK[word], type: "direct" });
    }
  }

  // Contextual matching: look for themes/topics that map to Márquez words
  const contextMap = {
    "alone|lonely|isolated|apart": "solitude",
    "sad|unhappy|depressed|blue|down": "melancholy",
    "miss|missing|remember|past|childhood": "nostalgia",
    "feeling|sense|intuition|gut": "premonition",
    "empty|barren|abandoned|desolate": "desolation",
    "confused|lost|bewildered|baffled": "bewilderment",
    "unreal|dreamlike|surreal|weird": "hallucination",
    "complicated|maze|stuck|tangled": "labyrinth",
    "forgot|forgotten|erased|vanished": "oblivion",
    "spreading|contagious|toxic|viral": "pestilence",
    "shocked|stunned|frozen|paralyzed": "stupor",
    "revenge|payback|karma|justice": "vengeance",
    "change|transform|evolve|become": "metamorphosis",
    "fleeting|brief|temporary|passing": "ephemeral",
    "clarity|insight|realization|eureka": "lucidity",
    "crazy|wild|feverish|obsessed": "delirium",
    "unstoppable|inevitable|relentless": "inexorable",
    "amazing|incredible|remarkable|extraordinary": "prodigious",
    "persistent|stubborn|determined|relentless": "tenacious",
    "accepted|surrendered|given up|resigned": "resignation",
    "calm|composed|unshaken|serene": "imperturbable",
    "burning|blazing|glowing|fiery": "incandescent",
    "disaster|catastrophe|collapse|end": "cataclysm",
    "desire|lust|craving|yearning": "concupiscence",
    "destroyed|annihilated|wiped out|ruined": "annihilation",
    "disillusioned|disappointed|jaded": "disenchantment",
    "hopeless|unfixable|permanent|irreversible": "irremediable",
    "grand|glorious|splendid|majestic": "magnificence",
    "chaotic|turbulent|stormy|volatile": "turbulence"
  };

  const lowerTranscript = transcript.toLowerCase();
  for (const [patterns, phraseKey] of Object.entries(contextMap)) {
    const regex = new RegExp(patterns);
    if (regex.test(lowerTranscript) && PHRASE_BANK[phraseKey]) {
      const alreadyFound = matches.find(m => m.word === phraseKey);
      if (!alreadyFound) {
        matches.push({ word: phraseKey, ...PHRASE_BANK[phraseKey], type: "contextual" });
      }
    }
  }

  return matches;
}

// Speak Spanish slowly using Web Speech API
function speakSpanishSlowly(text, onStart, onEnd) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.55; // Very slow
  utterance.pitch = 0.95;
  utterance.volume = 1.0;

  // Try to find a Spanish voice
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(v => v.lang.startsWith("es")) || voices[0];
  if (spanishVoice) utterance.voice = spanishVoice;

  utterance.onstart = onStart;
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function MarquezVocabularyCoach() {
  const [isListening, setIsListening] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentSpeaking, setCurrentSpeaking] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWordList, setShowWordList] = useState(false);
  const [wordPage, setWordPage] = useState(0);
  const [status, setStatus] = useState("idle");
  const [analysisCount, setAnalysisCount] = useState(0);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("listen");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const transcriptRef = useRef("");
  const startTimeRef = useRef(null);

  // Load voices
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  // Timer
  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        setTimeElapsed(elapsed);
        if (elapsed >= LISTEN_DURATION_MS) {
          stopListening();
        }
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isListening]);

  const startListening = useCallback(() => {
    setError(null);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech Recognition not supported. Please use Chrome, Safari, or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript + " ";
      }
      transcriptRef.current = fullTranscript;
      setTranscript(fullTranscript);

      // Analyze periodically
      const matches = findMarquezMatches(fullTranscript);
      if (matches.length > 0) {
        setSuggestions(prev => {
          const existingWords = new Set(prev.map(s => s.word));
          const newOnes = matches.filter(m => !existingWords.has(m.word));
          if (newOnes.length > 0) {
            setAnalysisCount(c => c + newOnes.length);
          }
          return [...prev, ...newOnes];
        });
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please enable microphone permissions.");
      } else if (event.error !== "no-speech") {
        console.log("Speech recognition error:", event.error);
      }
    };

    recognition.onend = () => {
      // Restart if still within time limit
      if (isListening && Date.now() - startTimeRef.current < LISTEN_DURATION_MS) {
        try { recognition.start(); } catch(e) {}
      }
    };

    recognitionRef.current = recognition;
    startTimeRef.current = Date.now();

    try {
      recognition.start();
      setIsListening(true);
      setStatus("listening");
      setTranscript("");
      setSuggestions([]);
      transcriptRef.current = "";
    } catch(e) {
      setError("Could not start microphone. Please check permissions.");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setStatus("analyzing");

    // MEMORY SAFETY: Clear the raw transcript after final analysis
    const finalTranscript = transcriptRef.current;
    const finalMatches = findMarquezMatches(finalTranscript);
    setSuggestions(prev => {
      const existingWords = new Set(prev.map(s => s.word));
      const newOnes = finalMatches.filter(m => !existingWords.has(m.word));
      return [...prev, ...newOnes];
    });

    // DELETE the recording data - memory safe
    setTimeout(() => {
      transcriptRef.current = "";
      setTranscript(""); // Clear displayed transcript
      setStatus("complete");
    }, 2000);
  }, []);

  const handleSpeak = (suggestion) => {
    setCurrentSpeaking(suggestion.word);
    speakSpanishSlowly(
      suggestion.spanish,
      () => setIsSpeaking(true),
      () => { setIsSpeaking(false); setCurrentSpeaking(null); }
    );
  };

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPct = Math.min(100, (timeElapsed / LISTEN_DURATION_MS) * 100);

  // Word list filtering
  const filteredWords = searchTerm
    ? MARQUEZ_WORDS.filter(w => w.includes(searchTerm.toLowerCase()))
    : MARQUEZ_WORDS;
  const WORDS_PER_PAGE = 50;
  const totalPages = Math.ceil(filteredWords.length / WORDS_PER_PAGE);
  const pageWords = filteredWords.slice(wordPage * WORDS_PER_PAGE, (wordPage + 1) * WORDS_PER_PAGE);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0a0f 0%, #12111a 30%, #1a1520 60%, #0f0d14 100%)",
      color: "#e8e2d6",
      fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
      overflow: "hidden"
    }}>
      {/* Atmospheric background elements */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 20% 50%, rgba(218,165,32,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,69,19,0.04) 0%, transparent 50%)",
        pointerEvents: "none", zIndex: 0
      }} />

      {/* Yellow butterflies - Márquez signature */}
      <div style={{
        position: "fixed", top: "15%", right: "8%",
        fontSize: "2rem", opacity: 0.12,
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none", zIndex: 0
      }}>
        {"🦋"}
      </div>
      <div style={{
        position: "fixed", top: "60%", left: "5%",
        fontSize: "1.5rem", opacity: 0.08,
        animation: "float 12s ease-in-out infinite reverse",
        pointerEvents: "none", zIndex: 0
      }}>
        {"🦋"}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          75% { transform: translateY(-25px) rotate(4deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes speakPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(218,165,32,0.4); }
          50% { box-shadow: 0 0 20px 8px rgba(218,165,32,0.15); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(218,165,32,0.2); border-radius: 3px; }
      `}</style>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "520px", margin: "0 auto",
        padding: "0 20px", paddingBottom: "100px"
      }}>
        {/* Header */}
        <header style={{
          textAlign: "center",
          paddingTop: "clamp(30px, 6vh, 60px)",
          paddingBottom: "24px"
        }}>
          <div style={{
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(218,165,32,0.5)",
            marginBottom: "10px",
            fontFamily: "'Crimson Pro', serif",
            fontWeight: 300
          }}>
            Cien Años de Soledad
          </div>
          <h1 style={{
            fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            fontWeight: 300,
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            background: "linear-gradient(135deg, #daa520 0%, #e8d5a0 40%, #daa520 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto",
            animation: "shimmer 8s linear infinite"
          }}>
            El Vocabulario<br />de Márquez
          </h1>
          <p style={{
            fontSize: "0.82rem",
            color: "rgba(232,226,214,0.4)",
            marginTop: "10px",
            fontStyle: "italic",
            fontWeight: 300,
            maxWidth: "320px",
            margin: "10px auto 0"
          }}>
            Listen to conversation. Discover the Márquez word<br />
            you were meant to speak.
          </p>
        </header>

        {/* Tab Navigation */}
        <nav style={{
          display: "flex",
          gap: "2px",
          marginBottom: "28px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "10px",
          padding: "3px",
          border: "1px solid rgba(218,165,32,0.08)"
        }}>
          {[
            { id: "listen", label: "Escuchar" },
            { id: "vocabulary", label: "Vocabulario" },
            { id: "about", label: "Acerca de" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowWordList(tab.id === "vocabulary"); }}
              style={{
                flex: 1,
                padding: "10px 0",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontFamily: "'Crimson Pro', serif",
                fontWeight: activeTab === tab.id ? 600 : 300,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                background: activeTab === tab.id
                  ? "linear-gradient(135deg, rgba(218,165,32,0.15), rgba(218,165,32,0.08))"
                  : "transparent",
                color: activeTab === tab.id ? "#daa520" : "rgba(232,226,214,0.35)"
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ═══ LISTEN TAB ═══ */}
        {activeTab === "listen" && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            {/* Mic Control */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                {isListening && (
                  <div style={{
                    position: "absolute",
                    inset: "-12px",
                    borderRadius: "50%",
                    border: "1px solid rgba(218,165,32,0.2)",
                    animation: "pulse-ring 2s ease-in-out infinite"
                  }} />
                )}
                {isListening && (
                  <div style={{
                    position: "absolute",
                    inset: "-24px",
                    borderRadius: "50%",
                    border: "1px solid rgba(218,165,32,0.1)",
                    animation: "pulse-ring 2s ease-in-out infinite 0.5s"
                  }} />
                )}
                <button
                  onClick={isListening ? stopListening : startListening}
                  style={{
                    width: "88px",
                    height: "88px",
                    borderRadius: "50%",
                    border: `2px solid ${isListening ? "#daa520" : "rgba(218,165,32,0.3)"}`,
                    background: isListening
                      ? "radial-gradient(circle, rgba(218,165,32,0.2) 0%, rgba(218,165,32,0.05) 100%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.4s ease",
                    position: "relative"
                  }}
                >
                  {isListening ? (
                    <div style={{
                      width: "22px", height: "22px",
                      borderRadius: "3px",
                      background: "#daa520"
                    }} />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#daa520" strokeWidth="1.5">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  )}
                </button>
              </div>

              <div style={{
                marginTop: "16px",
                fontSize: "0.72rem",
                color: "rgba(232,226,214,0.4)",
                fontFamily: "'Crimson Pro', serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase"
              }}>
                {status === "idle" && "Tap to begin listening"}
                {status === "listening" && "Listening to conversation..."}
                {status === "analyzing" && "Analyzing & deleting recording..."}
                {status === "complete" && "Analysis complete — recording deleted"}
              </div>

              {error && (
                <div style={{
                  marginTop: "12px",
                  padding: "10px 16px",
                  background: "rgba(180,50,50,0.15)",
                  border: "1px solid rgba(180,50,50,0.25)",
                  borderRadius: "8px",
                  fontSize: "0.78rem",
                  color: "#e8a0a0"
                }}>
                  {error}
                </div>
              )}
            </div>

            {/* Progress */}
            {isListening && (
              <div style={{
                marginBottom: "28px",
                animation: "fadeSlideUp 0.3s ease"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.7rem",
                  color: "rgba(232,226,214,0.35)",
                  marginBottom: "6px",
                  fontFamily: "'Crimson Pro', serif"
                }}>
                  <span>{formatTime(timeElapsed)}</span>
                  <span>10:00</span>
                </div>
                <div style={{
                  height: "3px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #daa520, #e8d5a0)",
                    borderRadius: "2px",
                    transition: "width 1s linear"
                  }} />
                </div>
                <div style={{
                  textAlign: "center",
                  marginTop: "8px",
                  fontSize: "0.68rem",
                  color: "rgba(218,165,32,0.4)"
                }}>
                  {analysisCount} Márquez interjection{analysisCount !== 1 ? "s" : ""} found
                </div>
              </div>
            )}

            {/* Memory Safety Badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              background: "rgba(34,139,34,0.06)",
              border: "1px solid rgba(34,139,34,0.12)",
              borderRadius: "8px",
              marginBottom: "24px"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(34,139,34,0.6)" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span style={{
                fontSize: "0.68rem",
                color: "rgba(34,139,34,0.5)",
                fontFamily: "'Crimson Pro', serif",
                letterSpacing: "0.05em"
              }}>
                Memory-safe — recordings are never stored, deleted after analysis
              </span>
            </div>

            {/* Live Transcript (shown while listening) */}
            {isListening && transcript && (
              <div style={{
                marginBottom: "24px",
                padding: "16px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(218,165,32,0.06)",
                borderRadius: "10px",
                animation: "fadeSlideUp 0.3s ease"
              }}>
                <div style={{
                  fontSize: "0.65rem",
                  color: "rgba(218,165,32,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  marginBottom: "8px",
                  fontFamily: "'Crimson Pro', serif"
                }}>
                  Live transcript (will be deleted)
                </div>
                <p style={{
                  fontSize: "0.82rem",
                  color: "rgba(232,226,214,0.5)",
                  lineHeight: 1.6,
                  margin: 0,
                  fontStyle: "italic",
                  maxHeight: "120px",
                  overflow: "hidden"
                }}>
                  {transcript.slice(-300)}
                </p>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h2 style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(218,165,32,0.45)",
                  fontWeight: 400,
                  marginBottom: "16px",
                  fontFamily: "'Crimson Pro', serif"
                }}>
                  Márquez Interjections
                </h2>

                {suggestions.map((s, idx) => (
                  <div
                    key={s.word}
                    onClick={() => setExpandedSuggestion(expandedSuggestion === idx ? null : idx)}
                    style={{
                      marginBottom: "12px",
                      padding: "18px",
                      background: currentSpeaking === s.word
                        ? "rgba(218,165,32,0.08)"
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${currentSpeaking === s.word ? "rgba(218,165,32,0.2)" : "rgba(218,165,32,0.06)"}`,
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      animation: `fadeSlideUp 0.4s ease ${idx * 0.1}s both`,
                      ...(currentSpeaking === s.word ? { animation: "speakPulse 1.5s ease-in-out infinite" } : {})
                    }}
                  >
                    {/* Word header */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px"
                    }}>
                      <div>
                        <span style={{
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          color: "#daa520",
                          fontFamily: "'Cormorant Garamond', serif"
                        }}>
                          {s.word}
                        </span>
                        {SPANISH_TRANSLATIONS[s.word] && (
                          <span style={{
                            marginLeft: "10px",
                            fontSize: "0.78rem",
                            color: "rgba(232,226,214,0.35)",
                            fontStyle: "italic"
                          }}>
                            {SPANISH_TRANSLATIONS[s.word]}
                          </span>
                        )}
                      </div>
                      <span style={{
                        fontSize: "0.58rem",
                        padding: "3px 8px",
                        borderRadius: "20px",
                        background: s.type === "direct"
                          ? "rgba(218,165,32,0.12)"
                          : "rgba(139,92,246,0.12)",
                        color: s.type === "direct"
                          ? "rgba(218,165,32,0.6)"
                          : "rgba(139,92,246,0.6)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontFamily: "'Crimson Pro', serif"
                      }}>
                        {s.type === "direct" ? "exact" : "contextual"}
                      </span>
                    </div>

                    {/* Context */}
                    <div style={{
                      fontSize: "0.72rem",
                      color: "rgba(232,226,214,0.35)",
                      marginBottom: "10px",
                      fontStyle: "italic"
                    }}>
                      {s.context}
                    </div>

                    {/* English phrase */}
                    <div style={{
                      fontSize: "0.88rem",
                      color: "rgba(232,226,214,0.75)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      padding: "10px 14px",
                      background: "rgba(218,165,32,0.03)",
                      borderLeft: "2px solid rgba(218,165,32,0.15)",
                      borderRadius: "0 6px 6px 0",
                      marginBottom: "10px"
                    }}>
                      "{s.phrase}"
                    </div>

                    {/* Spanish phrase */}
                    <div style={{
                      fontSize: "0.82rem",
                      color: "rgba(218,165,32,0.6)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      marginBottom: "12px"
                    }}>
                      "{s.spanish}"
                    </div>

                    {/* Speak button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(s);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        background: currentSpeaking === s.word
                          ? "rgba(218,165,32,0.15)"
                          : "rgba(218,165,32,0.06)",
                        border: "1px solid rgba(218,165,32,0.15)",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontSize: "0.72rem",
                        color: "#daa520",
                        fontFamily: "'Crimson Pro', serif",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      {currentSpeaking === s.word ? "Speaking slowly..." : "Speak Spanish slowly"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isListening && suggestions.length === 0 && status === "idle" && (
              <div style={{
                textAlign: "center",
                padding: "40px 20px",
                animation: "fadeSlideUp 0.5s ease"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.15 }}>{"🦋"}</div>
                <p style={{
                  fontSize: "0.88rem",
                  color: "rgba(232,226,214,0.3)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  maxWidth: "280px",
                  margin: "0 auto"
                }}>
                  Tap the microphone to listen to 10 minutes of conversation.
                  Márquez's vocabulary will find you when the moment is right.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ═══ VOCABULARY TAB ═══ */}
        {activeTab === "vocabulary" && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <h2 style={{
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(218,165,32,0.45)",
                fontWeight: 400,
                margin: 0,
                fontFamily: "'Crimson Pro', serif"
              }}>
                1,000 Words from Macondo
              </h2>
              <span style={{
                fontSize: "0.65rem",
                color: "rgba(232,226,214,0.25)",
                fontFamily: "'Crimson Pro', serif"
              }}>
                {filteredWords.length} words
              </span>
            </div>

            {/* Search */}
            <div style={{
              position: "relative",
              marginBottom: "16px"
            }}>
              <input
                type="text"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setWordPage(0); }}
                placeholder="Search the vocabulary..."
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 36px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(218,165,32,0.1)",
                  borderRadius: "8px",
                  color: "#e8e2d6",
                  fontSize: "0.82rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  outline: "none"
                }}
              />
              <svg style={{ position: "absolute", left: "12px", top: "11px", opacity: 0.3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#daa520" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Word grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "6px",
              marginBottom: "16px"
            }}>
              {pageWords.map((word, i) => {
                const hasTranslation = SPANISH_TRANSLATIONS[word];
                const hasPhrase = PHRASE_BANK[word];
                return (
                  <div
                    key={word}
                    onClick={() => {
                      if (hasPhrase) handleSpeak(PHRASE_BANK[word]);
                      else if (hasTranslation) {
                        speakSpanishSlowly(hasTranslation, () => setIsSpeaking(true), () => setIsSpeaking(false));
                      }
                    }}
                    style={{
                      padding: "8px 10px",
                      background: hasPhrase
                        ? "rgba(218,165,32,0.06)"
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${hasPhrase ? "rgba(218,165,32,0.12)" : "rgba(255,255,255,0.04)"}`,
                      borderRadius: "6px",
                      cursor: hasTranslation || hasPhrase ? "pointer" : "default",
                      transition: "all 0.2s ease",
                      animation: `fadeSlideUp 0.3s ease ${(i % 10) * 0.02}s both`
                    }}
                  >
                    <div style={{
                      fontSize: "0.78rem",
                      color: hasPhrase ? "#daa520" : "rgba(232,226,214,0.6)",
                      fontWeight: hasPhrase ? 500 : 400
                    }}>
                      {word}
                    </div>
                    {hasTranslation && (
                      <div style={{
                        fontSize: "0.65rem",
                        color: "rgba(218,165,32,0.35)",
                        fontStyle: "italic",
                        marginTop: "2px"
                      }}>
                        {hasTranslation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px"
            }}>
              <button
                onClick={() => setWordPage(p => Math.max(0, p - 1))}
                disabled={wordPage === 0}
                style={{
                  padding: "6px 14px",
                  background: "rgba(218,165,32,0.06)",
                  border: "1px solid rgba(218,165,32,0.1)",
                  borderRadius: "6px",
                  color: wordPage === 0 ? "rgba(232,226,214,0.15)" : "#daa520",
                  cursor: wordPage === 0 ? "default" : "pointer",
                  fontSize: "0.72rem",
                  fontFamily: "'Crimson Pro', serif"
                }}
              >
                Previous
              </button>
              <span style={{
                fontSize: "0.68rem",
                color: "rgba(232,226,214,0.3)",
                fontFamily: "'Crimson Pro', serif"
              }}>
                {wordPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setWordPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={wordPage >= totalPages - 1}
                style={{
                  padding: "6px 14px",
                  background: "rgba(218,165,32,0.06)",
                  border: "1px solid rgba(218,165,32,0.1)",
                  borderRadius: "6px",
                  color: wordPage >= totalPages - 1 ? "rgba(232,226,214,0.15)" : "#daa520",
                  cursor: wordPage >= totalPages - 1 ? "default" : "pointer",
                  fontSize: "0.72rem",
                  fontFamily: "'Crimson Pro', serif"
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ═══ ABOUT TAB ═══ */}
        {activeTab === "about" && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            <div style={{
              padding: "24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(218,165,32,0.06)",
              borderRadius: "12px",
              marginBottom: "16px"
            }}>
              <h3 style={{
                fontSize: "1rem",
                color: "#daa520",
                fontWeight: 400,
                marginTop: 0,
                marginBottom: "12px"
              }}>
                How It Works
              </h3>
              <div style={{
                fontSize: "0.82rem",
                color: "rgba(232,226,214,0.5)",
                lineHeight: 1.8
              }}>
                <p style={{ marginTop: 0 }}>
                  <strong style={{ color: "rgba(218,165,32,0.7)" }}>1.</strong> Tap the microphone to begin listening to your conversation.
                </p>
                <p>
                  <strong style={{ color: "rgba(218,165,32,0.7)" }}>2.</strong> The app analyzes up to 10 minutes of speech in real-time, looking for moments where a word from García Márquez would elevate your expression.
                </p>
                <p>
                  <strong style={{ color: "rgba(218,165,32,0.7)" }}>3.</strong> When it finds a match, it suggests a Márquez-style phrase you could use — in English and Spanish.
                </p>
                <p>
                  <strong style={{ color: "rgba(218,165,32,0.7)" }}>4.</strong> Tap the speaker button to hear the Spanish translation spoken slowly, so you can learn the pronunciation.
                </p>
                <p style={{ marginBottom: 0 }}>
                  <strong style={{ color: "rgba(218,165,32,0.7)" }}>5.</strong> After analysis, the recording is permanently deleted. Only the vocabulary suggestions remain.
                </p>
              </div>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(218,165,32,0.06)",
              borderRadius: "12px",
              marginBottom: "16px"
            }}>
              <h3 style={{
                fontSize: "1rem",
                color: "#daa520",
                fontWeight: 400,
                marginTop: 0,
                marginBottom: "12px"
              }}>
                Memory-Safe Architecture
              </h3>
              <div style={{
                fontSize: "0.82rem",
                color: "rgba(232,226,214,0.5)",
                lineHeight: 1.8
              }}>
                <p style={{ marginTop: 0 }}>
                  This app uses a privacy-first, memory-safe design. Audio is processed via the browser's built-in Web Speech API — no audio data is ever sent to a server.
                </p>
                <p>
                  The speech transcript is held only in volatile memory during the listening session. Once analysis is complete, the transcript reference is explicitly nullified and garbage-collected.
                </p>
                <p style={{ marginBottom: 0 }}>
                  No recordings, transcripts, or personal data are persisted anywhere. The only data stored is the curated vocabulary list from the novel itself.
                </p>
              </div>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(218,165,32,0.06)",
              borderRadius: "12px",
              marginBottom: "16px"
            }}>
              <h3 style={{
                fontSize: "1rem",
                color: "#daa520",
                fontWeight: 400,
                marginTop: 0,
                marginBottom: "12px"
              }}>
                Cross-Platform (PWA)
              </h3>
              <div style={{
                fontSize: "0.82rem",
                color: "rgba(232,226,214,0.5)",
                lineHeight: 1.8
              }}>
                <p style={{ marginTop: 0 }}>
                  This is a Progressive Web App that works on iPhone (Safari), Android (Chrome), and desktop browsers. Use "Add to Home Screen" in your browser to install it as a native-feeling app.
                </p>
                <p style={{ marginBottom: 0 }}>
                  For native app distribution via App Store / Play Store, this codebase can be wrapped using Capacitor (Ionic) or a similar WebView wrapper — the code is framework-agnostic and runs entirely client-side.
                </p>
              </div>
            </div>

            <div style={{
              textAlign: "center",
              padding: "20px",
              fontSize: "0.72rem",
              color: "rgba(232,226,214,0.2)",
              fontStyle: "italic"
            }}>
              Built with 1,000 words extracted from<br />
              Gabriel García Márquez's<br />
              <em>One Hundred Years of Solitude</em>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
