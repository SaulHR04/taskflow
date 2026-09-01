import { useEffect, useState } from "react";

interface TaskflowInfo {
  version: string;
  app: string;
}

function TaskFlowS() {
  // Define explícitamente el tipo en useState
  const [info, setInfo] = useState<TaskflowInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://d3ujwk09smrk9z.cloudfront.net/info")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: TaskflowInfo) => {
        setInfo(data);
      })
      .catch((err: Error) => {
        setError(err.message);
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
      <h1>Task Flow Service</h1>
      <p>Version: {info.version}</p>
      <p>App: {info.app}</p>
    </div>
  );
}

export default TaskFlowS;