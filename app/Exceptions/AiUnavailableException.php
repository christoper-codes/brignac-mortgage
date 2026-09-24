<?php

namespace App\Exceptions;

use RuntimeException;

/**
 * The AI provider isn't configured, couldn't be reached, or answered with something unusable.
 */
class AiUnavailableException extends RuntimeException {}
