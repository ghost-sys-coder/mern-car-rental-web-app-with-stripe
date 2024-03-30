import moment from "moment";

/** function to format dates */
export const formatDate = (date:string | undefined) => moment(date).format("MMMM DD, YYYY");
