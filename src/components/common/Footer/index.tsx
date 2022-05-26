import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Fade, Backdrop } from '@material-ui/core';

// Context
import { useSendMail } from '../../../context/SendMailContext';
import { useDeselectAll } from '../../../context/DeselectAllContext';

// Components
import SendMail from '../../SendMail';

// Styles
import { CssModalStyles } from '../../../styles/globalMaterialUi';
import './styles.scss';
import '../../../styles/global.scss';

interface IParamsModal {
  multiple: boolean;
  channel: string;
  id: number;
  title: string;
  description: string;
  modified: string;
  pageCount: number;
  issueNumber: number;
  thumbnail: string;
  image: string;
  nameChannel: string;
  name: string[];
  active: boolean;
}

interface IParamTypes {
  channel: string;
}

const Footer: React.FC = () => {
  const classesModal = CssModalStyles();

  const { channel } = useParams<IParamTypes>();

  // Context
  const { funcOpenModalMailFooter, openModalMailFooter } = useSendMail();
  const { handleDeselectAll } = useDeselectAll();

  // State
  const [dataModalMail, setDataModalMail] = useState<IParamsModal>(
    {} as IParamsModal,
  );

  const handleOpenModalMail = useCallback(() => {
    setDataModalMail({
      multiple: true,
      channel: channel || 'comics',
      id: 0,
      title: '',
      description: '',
      modified: '',
      pageCount: 0,
      issueNumber: 0,
      thumbnail: '',
      image: '',
      nameChannel: '',
      name: [''],
      active: false,
    });

    funcOpenModalMailFooter(true);
  }, [channel, funcOpenModalMailFooter]);

  const handleDeselectAllItens = useCallback(async () => {
    localStorage.removeItem('@TestSoftDesign:comics');
    localStorage.removeItem('@TestSoftDesign:characters');
    localStorage.removeItem('@TestSoftDesign:creators');
    handleDeselectAll();
  }, [handleDeselectAll]);

  return (
    <div className="footer-container">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classesModal.modal}
        open={openModalMailFooter}
        onClose={() => funcOpenModalMailFooter(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalMailFooter}>
          <div className={classesModal.paper}>
            <SendMail data={dataModalMail} />
          </div>
        </Fade>
      </Modal>

      <button
        style={{ marginRight: '10px' }}
        type="button"
        className="global-button"
        onClick={() => handleOpenModalMail()}
      >
        Enviar E-mail dos itens selecionados
      </button>
      <button
        style={{ marginLeft: '10px' }}
        type="button"
        className="global-button-clear"
        onClick={handleDeselectAllItens}
      >
        Desmarcar todos
      </button>
    </div>
  );
};

export default Footer;
