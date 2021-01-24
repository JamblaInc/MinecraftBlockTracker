import { React, useState } from "react";
import Layout from "./components/Layout/Layout";
import BlockTable from "./components/BlockTable/BlockTable";
import Backdrop from "./components/Backdrop/Backdrop";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Layout>
        <Backdrop show={loading} />
        <BlockTable setLoading={setLoading} />
      </Layout>
    </div>
  );
}

export default App;
