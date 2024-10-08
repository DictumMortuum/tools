import React, { createContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
export const UserContext = createContext(null);

const urlToScreenshot = url => {
  const req = new URL("https://extapi.dictummortuum.com/screenshot");
  req.searchParams.append("url", encodeURI(url));
  req.searchParams.append("format", "jpeg");
  req.searchParams.append("no_ads", "true");
  req.searchParams.append("no_tracking", "true");
  req.searchParams.append("no_cookie_banners", "true");
  req.searchParams.append("latitude", "37.9838");
  req.searchParams.append("longitude", "23.7275");
  req.searchParams.append("wait_until", "page_loaded");
  return req.href;
}

const generateComponents = email => [{
  name: "Home",
  link: "/",
  component: <HomeIcon />,
},{
  name: "Wishlist",
  link: email === null ? "/wishlist" : `/wishlist/${email}`,
  component: <FavoriteIcon />,
}];

const parseLoginCookie = () => {
  const raw = localStorage.getItem('auth');
  const auth = JSON.parse(raw);

  if (auth === null) {
    return {
      email: null,
      user_id: null,
    }
  }

  const { status } = auth;

  if (status !== "OK") {
    return {
      email: null,
      user_id: null,
      components: generateComponents(null),
    }
  }

  const { user: { id, email }} = auth;

  return {
    email,
    user_id: id,
    components: generateComponents(email),
  }
}

const reducer = (state, action) => {
  switch (action.type) {

    case "wishlist::name": {
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          name: action.name,
        }
      }
    }

    case "wishlist::url": {
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          url: action.url,
          screenshot: urlToScreenshot(action.url)
        }
      }
    }

    case "wishlist::reserved": {
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          reserved: action.checked,
        }
      }
    }

    case "user::set": {
      return {
        ...state,
        user: parseLoginCookie(),
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}

export const UserProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, {
    user: parseLoginCookie(),
    wishlist: {
      name: "",
      reserved: false,
      url: "",
      screenshot: "",
    }
  });

  return (
    <UserContext.Provider value={{
      open,
      setOpen,
      msg,
      setMsg,
      loading,
      setLoading,
      state,
      dispatch
    }}>
      {children}
    </UserContext.Provider>
  );
}
