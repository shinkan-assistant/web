export function convertUserImpl2AuthUser(userImpl) {
  return userImpl ? {
    email: userImpl.email,
    photoURL: userImpl.photoURL,
  } : null;
}
