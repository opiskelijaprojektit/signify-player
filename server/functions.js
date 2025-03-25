import crypto from 'node:crypto'

/**
 * Hashes given text and returns it.
 *
 * @example
 *   // Generate MD5 hash.
 *   const hash = calculateHash('saippuakauppias')
 *   // Generate SHA256 hash.
 *   const hash = calculateHash('saippuakauppias', 'sha256')
 *  
 * @param   {string} stringToHash
 *          String to be hashed.
 * @param   {string} algorithm
 *          Hash algorithm to be used.
 * @returns {string}
 *          Hashed string.
 */
function calculateHash(stringToHash, algorithm='md5') {
  return crypto.createHash(algorithm)
               .update(stringToHash)
               .digest('hex')
               .toString()
}

export { calculateHash }