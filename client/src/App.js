import React from "react";
import Layout from "./components/Layout/Layout";
import VotePanel from "./components/VotePanel/VotePanel";

function App() {
  return (
    <div>
      <Layout>
        <VotePanel />
      </Layout>
    </div>
  );
}

export default App;
