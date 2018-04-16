import Ract from 'react';
import { Menu, Button } from 'semantic-ui-react';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item>
        <h4>CrowdCoin</h4>
      </Menu.Item>
      <Menu.Menu position = "right">
        <Menu.Item><h4>Campaign</h4></Menu.Item>
        <Menu.Item>
         <Button icon = 'add' primary/>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
