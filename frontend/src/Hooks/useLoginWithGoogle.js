// Modules
import { useCallback } from 'react';

// Config
import { GOOGLE_OAUTH2_URL, GOOGLE_OAUTH2_OPTIONS } from 'Config/google';

export function useLoginWithGoogle() {
  const loginWithGoogle = useCallback(() => {
    const searchParams = new URLSearchParams({
      client_id: GOOGLE_OAUTH2_OPTIONS.clientId,
      redirect_uri: GOOGLE_OAUTH2_OPTIONS.redirectUri,
      response_type: GOOGLE_OAUTH2_OPTIONS.responseType,
      scope: GOOGLE_OAUTH2_OPTIONS.scopes.join(' '),
    });

    window.open(
      GOOGLE_OAUTH2_URL.concat('?', searchParams.toString()),
      '_self',
      'noopener noreferrer'
    );
  }, []);

  return loginWithGoogle;
}
