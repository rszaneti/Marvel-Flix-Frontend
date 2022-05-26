import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Fade, Backdrop } from '@material-ui/core';

// Context
import { useSendMail } from '../../../context/SendMailContext';

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
  modified: Date | null;
  pageCount: number;
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
      modified: null,
      pageCount: 0,
      thumbnail: '',
      image: '',
      nameChannel: '',
      name: [''],
      active: false,
    });

    funcOpenModalMailFooter(true);
  }, [channel, funcOpenModalMailFooter]);

  const handleDeselectAll = useCallback(async () => {
    localStorage.removeItem(`@TestSoftDesign:${channel || 'comics'}`);
  }, [channel]);

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
        type="button"
        className="global-button"
        onClick={() => handleOpenModalMail()}
      >
        Enviar E-mail dos itens selecionados
      </button>
      <button
        type="button"
        className="global-button-clear"
        onClick={handleDeselectAll}
      >
        Desmarcar todos
      </button>
    </div>
  );
};

export default Footer;
