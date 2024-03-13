import { NextApiRequest, NextApiResponse } from "next";

const formSubmissionHandler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Received form data:", req.body);

  const mockResponse = {
    success: true,
    message: "Form data received successfully.",
  };

  setTimeout(() => {
    res.status(200).json(mockResponse);
  }, 1000);
};

export default formSubmissionHandler;
