class ApiError extends Error {
  constructor(type, message, status) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.status = status
  }
}

class InternalServerError extends ApiError {
  constructor(type = 'E_INTERNAL', message = 'Internal server error.') {
    super(type, message, 500)
  }
}

class ValidationError extends ApiError {
  constructor(type = 'E_VALIDATION', message = 'Validation failed.') {
    super(type, message, 400)
  }
}
class ForbiddenError extends ApiError {
  constructor(type = 'E_FORBIDDEN', message = 'Forbidden.') {
    super(type, message, 403)
  }
}

class NotFoundError extends ApiError {
  constructor(type = 'E_NOT_FOUND', message = 'Not found.') {
    super(type, message, 404)
  }
}

module.exports = {
  ApiError,
  InternalServerError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
}
