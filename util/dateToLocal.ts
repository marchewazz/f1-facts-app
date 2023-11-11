export default function dateToLocal(utcDateString: Date) {
    return new Date(utcDateString.getTime() - utcDateString.getTimezoneOffset() * 60000)
}