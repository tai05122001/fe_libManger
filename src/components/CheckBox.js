

const CheckBox = ({ label, id, onChangeStatus}) => {

  return (
    <div class="checkbox-cus">
          <input type="checkbox" id={id} onChange ={onChangeStatus} />
          <label  for={id}>{label}</label>

    </div>
  );
};

export default CheckBox;