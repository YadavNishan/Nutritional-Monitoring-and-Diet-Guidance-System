export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatString = (str: string) => {
    return str
        .toLowerCase()               // Convert the entire string to lowercase
        .replace(/_/g, " ")          // Replace underscores with spaces
        .split(" ")                  // Split the string into words
        .map((word) =>
            word.charAt(0).toUpperCase() + word.slice(1) // Capitalize first letter
        )
        .join(" ");                  // Join the words back together
};
