import { Button, Space } from "antd";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Space>
      <Link to="/citation">
        <Button>参考文献生成</Button>
      </Link>
      <Link to="/gene-ankiDecker">
        <Button>制作anki decker</Button>
      </Link>
    </Space>
  );
};

export default Home;
