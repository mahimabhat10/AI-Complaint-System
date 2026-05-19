const axios = require("axios");

exports.analyzeComplaint = async (req, res) => {

  try {

    const { description } = req.body;

    const prompt = `
    Analyze this complaint:

    "${description}"

    Give:
    1. Priority
    2. Responsible Department
    3. Complaint Summary
    4. Automatic Response Message
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      result:
        response.data.choices[0].message.content
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI Analysis Failed"
    });
  }
};