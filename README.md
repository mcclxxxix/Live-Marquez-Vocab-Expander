# Live-Marquez-Vocab-Expander
A web app to eavesdrop on me and suggest when I might speak like the Greatest Novelist of the Americas
# launch in 1 step:
https://webcontainer.new/


or setup dev env:
# Create a new React app
npx create-react-app marquez-app
cd marquez-app

# Replace the App.js with your component
# Copy marquez-vocabulary-coach.jsx into src/
# Update src/index.js to import it:

import MarquezVocabularyCoach from './marquez-vocabulary-coach';
ReactDOM.render(<MarquezVocabularyCoach />, document.getElementById('root'));

