import { handleQuery } from "../agents/agent.router.js";

export const chatController = async (req, res) => {
    const {message} = req.body;

    if(!message){
        return res.status(400).json("message is required");
    }
   
      try {
        const result = await handleQuery(message);

        return res.status(200).json({
            reply: result.answer,
            source: result.source
        });
    } catch (error) {
            console.error("❌ Error in chatController:", error);
        return res.status(500).json("Something went Wrong")
    }


  


}
    