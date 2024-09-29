import * as React from 'react';
import { UserContext } from '../../../context';
import { useDebounce } from '@uidotdev/usehooks';

const Component = () => {
  const { state: { wishlist: { url, screenshot } } } = React.useContext(UserContext);
  const debounced = useDebounce(screenshot, 1000);

  if (url === "") {
    return <></>
  }

  return (
    <img src={debounced} alt="" style={{ maxWidth: "100%" }} />
  );
}

export default Component;
