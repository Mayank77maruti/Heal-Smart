const supportedLanguage = ['c_cpp', 'java', 'python', 'nodejs', 'golang', 'csharp', 'rust']
const validateCode = async (req, res, next) => {
    try {
        let { code, language } = req.body
        language = language.toLowerCase()
        if (language == 'javascript') language = 'nodejs'
        if (!code || !language) {
            return res.status(400).send({ error: 'Please provide code and language' })
        }
        if (!supportedLanguage.includes(language)) {
            return res.status(400).send({ error: 'Language not supported' })
        }
        req.body.language = language
        next()
    } catch (error) {
        console.log('error in code execute');
        return res.status(500).send({ error: error });
    }
}

module.exports = validateCode