import {checkAuth, decodeAuthToken} from "db/auth"
import {errorUnauthorized} from "utils/errors"
import {Request, Response, NextFunction} from "utils/express"

export default (req: Request, res: Response, next: NextFunction) => {
  const [strategy, token] = (req.get('authorization') || '').split(' ');
  const token_payload = decodeAuthToken(token)

  if (strategy !== 'Custom' || !token_payload) return next(errorUnauthorized())
  const authorized = checkAuth(token_payload);

  if (!authorized) return next(errorUnauthorized());

  req.user = token_payload;
  return next();
}
