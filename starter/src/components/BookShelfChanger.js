const options = [
  { value: "currentlyReading", text: "Currently Reading" },
  { value: "wantToRead", text: "Want to Read" },
  { value: "read", text: "Read" },
  { value: "none", text: "None" }
]

export default function BookShelfChanger({ shelf, moveBookToShelf }) {
  const selectedShelf = shelf ?? "none";

  return (
    <div className="book-shelf-changer">
      <select onChange={(e) => moveBookToShelf(e.target.value)} value={selectedShelf}>
        <option value="placeholder" disabled>
          Move to...
        </option>
        {options.map((option) => (
          <option
            value={option.value}
            key={option.value}
          >{option.text}</option>
        ))}
      </select>
    </div>
  )
}