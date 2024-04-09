export default {
    required: {
      value: true,
      message: "This field is required",
    },
    maxLength500: {
      value: 500,
      message: "Maximum length - 500 characters",
    },
    tagPattern: {
      value: /^[\w\s-]+$/,
      message:
        "Tags can only contain letters, numbers, spaces, and hyphens",
    },
    emailPattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    }
} 