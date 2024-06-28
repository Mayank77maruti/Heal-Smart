const axios = require('axios')

const url = "https://api.jdoodle.com/v1/execute";
const languageMap = {
    java: {
        name: "java",
        version: 4,
    },
    python: {
        name: "python3",
        version: 4,
    },
    c_cpp: {
        name: "cpp17",
        version: 0,
    },
    golang: {
        name: "go",
        version: 4,
    },
    csharp: {
        name: "csharp",
        version: 4,
    },
    nodejs: {
        name: "nodejs",
        version: 4,
    },
    rust: {
        name: "rust",
        version: 4,
    }
};

async function execute(req, res) {
    try {
        let { code, language } = req.body;
        const stdin = req.body.input || "";
        language = languageMap[language];
        const data = {
            script: code,
            language: language.name,
            versionIndex: language.version,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            stdin: stdin,
        };
        const response = await axios.post(url, data);
        console.log(response.data)
        return res.status(200).send(response.data);
    } catch (error) {
        console.log(error);
        console.log('error in code execute');
        return res.status(500).send({ error: error });
    }
}
module.exports = { execute };