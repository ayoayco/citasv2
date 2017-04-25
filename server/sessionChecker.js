function sessionCheck(request, response, next) {

    if (request.session.user) next();
    else response.send(401, 'authorization failed');
}