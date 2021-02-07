import env from 'env-var';
import dotenv from 'dotenv';

dotenv.config();

enum SignatureAlgorithm {
    SHA1 = 'sha1',
    SHA256 = 'sha256',
    SHA512 = 'sha512',
}

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    saml: {
        callbackUrl: env.get('SAML_CALLBACK_URL').default('http://localhost:4000/auth/saml/callback').asString(),
        entryPoint: env.get('SAML_ENTRY_POINT').default('http://localhost:8080/simplesaml/saml2/idp/SSOService.php').asString(),
        issuer: env.get('SAML_ISSUER').default('http://localhost:4000/metadata.xml').asString(),
        authnContext: env.get('AUTH_N_CONTEXT').default('http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows').asString(),
        identifierFormat: env.get('IDENTIFIER_FORMAT').asString(),
        signatureAlgorithm: env.get('SIGNATURE_ALGORITHM').default('sha256').asEnum(Object.values(SignatureAlgorithm)),
        acceptedClockSkewMs: env.get('ACCEPTED_CLOCK_SKEW_MS').default(-1).asInt(),
    },
    userService: {
        url: env.get('KARTOFFEL_BASE_URL').required().asString(),
        personRoute: env.get('KARTOFFEL_GET_PERSON_ENDPOINT').default('api/persons').asString(),
    },
};

export default config;
