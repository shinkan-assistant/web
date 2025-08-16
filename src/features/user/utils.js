export function convertUserImpl2AuthUser(userImpl) {
  return userImpl ? {
    email: userImpl.email,
    displayName: userImpl.displayName,
    photoURL: userImpl.photoURL,
  } : null;
}
