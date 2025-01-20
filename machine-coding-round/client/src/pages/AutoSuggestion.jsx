import React from "react";
import { AutoSearchBar, ShowSearchResults } from "../components";
import { useState } from "react";

const AutoSuggestion = () => {
  const [result, setResult] = useState([]);
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Auto Suggestion Namebox
      </h2>

      <div className="w-full container mx-auto p-4">
        <div className="w-full p-4 flex items-center justify-center">
          <div className="w-1/2 m-auto flex flex-col items-center min-w-60">
            {/* search bar */}
            <AutoSearchBar
              setResult={setResult}
              setShowResults={setShowResults}
            />
            {/* serach result */}
            <ShowSearchResults result={result} showResults={showResults} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSuggestion;
