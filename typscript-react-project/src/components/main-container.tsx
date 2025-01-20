import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const MainContainer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const fileToGeneratePart = async (
    file: File
  ): Promise<{
    inlineData: { data: string; mimeType: string };
  }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result as string;
        const base64Content = base64data.split(",")[1];
        resolve({
          inlineData: {
            data: base64Content,
            mimeType: file.type,
          },
        });
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const identifyImage = async (additionalPrompt: string = "") => {
    if (!image) return;

    setLoading(true);

    const genAI = new GoogleGenerativeAI(
      import.meta.env.VITE_APP_GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    try {
      const imageParts = await fileToGeneratePart(image);

      const result = await model.generateContent([
        `Please identify this image and share its name along with any key details or insights. I'd love to learn more about it, including a brief explanation to better understand the image. ${additionalPrompt}`,
        imageParts,
      ]);

      const response = await result.response;
      const text = response
        .text()
        .trim()
        .replace(/```/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/-\s*/g, "")
        .replace(/\n\s*\n/g, "\n");
      setResult(text);

      generateKeywords(text);
      await generateRelatedQuestions(text);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const generateKeywords = async (text: string) => {
    const words = text.split(/\s+/);
    const keywordsSet = new Set<string>();
    words.forEach((word) => {
      if (
        word.length > 4 &&
        !["this", "that", "what", "from", "have"].includes(word.toLowerCase())
      ) {
        keywordsSet.add(word);
      }
    });

    setKeywords(Array.from(keywordsSet).slice(0, 5));
  };

  const generateRelatedQuestions = async (text: string) => {
    setLoading(true);

    const genAI = new GoogleGenerativeAI(
      import.meta.env.VITE_APP_GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    try {
      const result = await model.generateContent([
        `Based on the following information about an image, generate 5 related questions that someone might ask to learn more about the subject:

            ${text}
    
            Format the output as a simple list of questions, one per line.`,
      ]);

      const response = await result.response;
      const questions = response.text().trim().split("\n");
      setRelatedQuestions(questions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const regnerateContent = (word: string) => {
    identifyImage(`Focus more on aspect related to "${word}"`);
  };

  const askRelatedQuestion = (qst: string) => {
    identifyImage(`Answer the following question about the image "${qst}"`);
  };

  return (
    <main className="container mx-auto w-full px-6 md:px-4 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Identify Your Image
          </h2>

          <div className="mb-8">
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload an image
            </label>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150 ease-in-out cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
            />
          </div>

          {image && (
            <div className="mb-8 flex justify-center">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded image"
                className="rounded-lg shadow-md w-80 h-80"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => identifyImage()}
            disabled={!image || loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
          >
            {loading ? "Indentifying..." : "Identify Image"}
          </button>
        </div>

        {result && (
          <div className="bg-blue-50 p-8 border-t border-blue-100">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              Image Informations
            </h3>

            <div className="w-full">
              {result.split("\n").map((line, index) => {
                if (
                  line.startsWith("Important Information") ||
                  line.startsWith("Other Information")
                ) {
                  return (
                    <h4
                      key={index}
                      className="text-xl font-semibold mt-4 mb-2 text-blue-700"
                    >
                      {line}
                    </h4>
                  );
                } else if (line.match(/^\d+\./) || line.startsWith("-")) {
                  return (
                    <li key={index} className="ml-4 mb-2 text-gray-700">
                      {line}
                    </li>
                  );
                } else if (line.trim() !== "") {
                  return (
                    <p key={index} className="mb-2 text-gray-800">
                      {line}
                    </p>
                  );
                }

                return null;
              })}
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold mt-4 mb-2 text-blue-700">
                Related Keywords
              </h4>

              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => regnerateContent(keyword)}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition duration-150 ease-in-out"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {relatedQuestions.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mt-4 mb-2 text-blue-700">
                  Related Questions
                </h4>

                <ul className="space-y-4">
                  {relatedQuestions.map((question, index) => (
                    <li key={index}>
                      <button
                        key={index}
                        onClick={() => askRelatedQuestion(question)}
                        className="text-left w-full bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition duration-150 ease-in-out"
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
