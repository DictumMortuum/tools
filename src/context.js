import React, { createContext } from 'react';

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

    default: {
      return {
        ...state,
      }
    }
  }
}

export const UserProvider = ({ children }) => {
  const [email, setEmail] = React.useState(null);
  const [user_id, setUserId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, {
    wishlist: {
      name: "",
      reserved: false,
      url: "",
      screenshot: "",
    }
  });

  return (
    <UserContext.Provider value={{
      email,
      setEmail,
      user_id,
      setUserId,
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
