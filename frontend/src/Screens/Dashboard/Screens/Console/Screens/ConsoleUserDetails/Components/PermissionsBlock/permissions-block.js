// Modules
import { useParams } from 'react-router-dom';

function PermissionsBlock(props) {
  const { permissions } = props;

  const { userId } = useParams();

  return <h1>Permissions tab</h1>;
}

export default PermissionsBlock;
