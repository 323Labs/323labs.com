export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'www.323labs.com') {
      url.hostname = '323labs.com';
      url.protocol = 'https:';
      return Response.redirect(url.href, 301);
    }

    return env.ASSETS.fetch(request);
  },
};
