import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles form submission API requests.
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */
const formSubmissionHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // Log received form data
  console.log("Received form data:", req.body);

  // Mock response with success message and received form data
  const mockResponse = {
    success: true,
    message: "Form data received successfully.",
    data: req.body,
  };

  //Simulate Loading time of 1 second before sending OK response
  setTimeout(() => {
    res.status(200).json(mockResponse);
  }, 1000);
};

export default formSubmissionHandler;
