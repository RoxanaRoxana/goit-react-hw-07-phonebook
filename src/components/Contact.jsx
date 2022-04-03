import axios from 'axios';
import { deleteContact } from 'features/contactSlice';
import { useDispatch } from 'react-redux';
import styles from './Contacts.module.css';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

    const handleDelete = () => {
      axios
        .delete(`https://624831f5229b222a3fd53797.mockapi.io/contacts/${id}`);
    };


 const removeContact = () => {
   dispatch(deleteContact({id: id}));
   handleDelete({id});
  };
  



  return (
    <li key={id} className={styles.contact__item}>
      <p className={styles.contact__text}>{name}:</p>
      <p className={styles.contact__text}>{number}</p>
      <button
        onClick={removeContact}
        className={styles.contact__button}
      >
        Delete
      </button>
    </li>
  );
}
