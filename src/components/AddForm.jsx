import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { saveContact } from 'features/contactSlice';
import axios from 'axios';

export default function AddForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleAdding = () => {
    axios.post(`https://624831f5229b222a3fd53797.mockapi.io/contacts`, {
      name,
      number,
    });
  };

  const addContact = e => {
    e.preventDefault();
    dispatch(
      saveContact({
        id: nanoid(),
        name,
        number,
      })
    );
    handleAdding();
  };

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  return (
    <form className={styles.addForm__editor} onSubmit={addContact}>
      <label className={styles.form__label}>
        Name
        <input
          className={styles.addForm__input}
          value={name}
          onChange={handleChangeName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={styles.form__label}>
        Number
        <input
          className={styles.addForm__input}
          value={number}
          onChange={handleChangeNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={styles.add__button}>
        Add contact
      </button>
    </form>
  );
}

// export default class AddForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleChangeName = e => {
//     this.setState({ name: e.currentTarget.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//       this.props.onSubmit(this.state);

//     this.setState({ name: '', number: '' });
//   };

//   handleChangeNumber = e => {
//     this.setState({ number: e.currentTarget.value });
//   };

//   render() {
//     return (
//       <form className={styles.addForm__editor} onSubmit={this.handleSubmit}>
//         <label className={styles.form__label}>
//           Name
//           <input
//             className={styles.addForm__input}
//             value={this.state.name}
//             onChange={this.handleChangeName}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>
//         <label className={styles.form__label}>
//           Number
//           <input
//             className={styles.addForm__input}
//             value={this.state.number}
//             onChange={this.handleChangeNumber}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <button type="submit" className={styles.add__button}>
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

AddForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
