import React, { useState, useEffect } from "react";

const FlagComponent = () => {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState("");
  const [displayedFlag, setDisplayedFlag] = useState("");

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6f7665"
        );
        const flagText = await response.text();
        setFlag(flagText);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setLoading(false);
      }
    };
    fetchFlag();
  }, []);

  useEffect(() => {
    if(flag){
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex !== flag.length - 1) {
                setDisplayedFlag((prevFlag) => {
                    return prevFlag + flag[currentIndex];
                });
                currentIndex += 1;
            }
            if (currentIndex === flag.length - 1) {
                clearInterval(intervalId);
            }
        }, 500);
        return () => clearInterval(intervalId);
    }
  }, [flag]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {displayedFlag.split("").map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlagComponent;
