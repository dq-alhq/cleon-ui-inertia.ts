const Ziggy = {"url":"http:\/\/inertia.test","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"home":{"uri":"\/","methods":["GET","HEAD"]},"about":{"uri":"about","methods":["GET","HEAD"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"users.index":{"uri":"users","methods":["GET","HEAD"]},"users.create":{"uri":"users\/create","methods":["GET","HEAD"]},"users.store":{"uri":"users","methods":["POST"]},"users.show":{"uri":"users\/{user}","methods":["GET","HEAD"],"parameters":["user"],"bindings":{"user":"id"}},"users.edit":{"uri":"users\/{user}\/edit","methods":["GET","HEAD"],"parameters":["user"],"bindings":{"user":"id"}},"users.update":{"uri":"users\/{user}","methods":["PUT","PATCH"],"parameters":["user"],"bindings":{"user":"id"}},"users.destroy":{"uri":"users\/{user}","methods":["DELETE"],"parameters":["user"],"bindings":{"user":"id"}},"users.roles":{"uri":"users\/roles\/{user}\/{role}","methods":["PUT"],"parameters":["user","role"],"bindings":{"user":"id","role":"id"}},"roles.index":{"uri":"roles","methods":["GET","HEAD"]},"roles.create":{"uri":"roles\/create","methods":["GET","HEAD"]},"roles.store":{"uri":"roles","methods":["POST"]},"roles.show":{"uri":"roles\/{role}","methods":["GET","HEAD"],"parameters":["role"]},"roles.edit":{"uri":"roles\/{role}\/edit","methods":["GET","HEAD"],"parameters":["role"],"bindings":{"role":"id"}},"roles.update":{"uri":"roles\/{role}","methods":["PUT","PATCH"],"parameters":["role"],"bindings":{"role":"id"}},"roles.destroy":{"uri":"roles\/{role}","methods":["DELETE"],"parameters":["role"],"bindings":{"role":"id"}},"roles.permissions":{"uri":"roles\/permissions\/{role}","methods":["PUT"],"parameters":["role"],"bindings":{"role":"id"}},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]},"logout":{"uri":"logout","methods":["POST"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
