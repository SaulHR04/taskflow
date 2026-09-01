import { useEffect, useState } from "react";

interface TaskFlowS {
  version: string;
  app: string;
}

function TaskFlowS() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://d3ujwk09smrk9z.cloudfront.net/info")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setInfo(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Task Flow</h1>
      <p>Version: {info.version}</p>
      <p>App: {info.app}</p>
    </div>
  );
}

export default TaskFlowS;