export default ({ app }, inject) => {
  // Provide the formatDate function globally
  inject('formatDate', (dateStr) => {
    return dateStr
      ? new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(dateStr))
      : undefined;
  });
};
