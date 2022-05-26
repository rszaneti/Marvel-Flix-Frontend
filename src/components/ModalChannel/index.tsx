import React, { useCallback, useState } from 'react';
import { IconButton, Modal, Fade, Backdrop } from '@material-ui/core';

import { FaCheckCircle, FaRegCalendarAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

// Context
import { useSendMail } from '../../context/SendMailContext';

// Components
import SendMail from '../SendMail';

// styles
import { CssTooltip, CssModalStyles } from '../../styles/globalMaterialUi';
import './styles.scss';
import '../../styles/global.scss';

interface IEmailSelect {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  modified: Date;
  pageCount: number;
}

interface IParamsModal {
  multiple: boolean;
  channel: string;
  id: number;
  title: string;
  description: string;
  modified: Date;
  pageCount: number;
  thumbnail: string;
  image: string;
  nameChannel: string;
  name: string[];
  active: boolean;
}

interface IParamTypes {
  data: {
    channel: string;
    id: number;
    title: string;
    description: string;
    modified: Date;
    pageCount: number;
    thumbnail: string;
    image: string;
    nameChannel: string;
    name: string[];
    active: boolean;
  };
}

const ModalChannel: React.FC<IParamTypes> = ({ data }) => {
  const classesModal = CssModalStyles();

  // Context
  const {
    funcOpenModalMailModalChannel,
    openModalMailModalChannel,
  } = useSendMail();

  // State
  const [active, setActive] = useState(data.active);
  const [dataModalMail, setDataModalMail] = useState<IParamsModal>(
    {} as IParamsModal,
  );

  const handleSetLocalStorage = useCallback(() => {
    const channelId = localStorage.getItem(`@TestSoftDesign:${data.channel}`);

    if (channelId) {
      const dataChannelId: IEmailSelect[] = JSON.parse(channelId);

      const existData = dataChannelId.filter(r => r.id === String(data.id));

      if (existData.length) {
        const dataNewChannelId: IEmailSelect[] = dataChannelId.filter(r =>
          String(data.id).indexOf(r.id),
        );

        localStorage.removeItem(`@TestSoftDesign:${data.channel}`);
        localStorage.setItem(
          `@TestSoftDesign:${data.channel}`,
          JSON.stringify(dataNewChannelId),
        );

        // state list manipulation;
        setActive(false);
      } else {
        dataChannelId.push({
          id: String(data.id),
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          modified: data.modified,
          pageCount: data.pageCount,
        });

        localStorage.setItem(
          `@TestSoftDesign:${data.channel}`,
          JSON.stringify(dataChannelId),
        );

        setActive(true);
      }
    } else {
      const dataChannelId: IEmailSelect[] = [
        {
          id: String(data.id),
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          modified: data.modified,
          pageCount: data.pageCount,
        },
      ];

      localStorage.setItem(
        `@TestSoftDesign:${data.channel}`,
        JSON.stringify(dataChannelId),
      );

      // state list manipulation;
      setActive(true);
    }
  }, [data]);

  const handleOpenModalMail = useCallback(() => {
    setDataModalMail({
      multiple: false,
      channel: data.channel,
      id: data.id,
      title: data.title,
      description: data.description,
      modified: data.modified,
      pageCount: data.pageCount,
      thumbnail: data.thumbnail,
      image: data.image,
      nameChannel: data.nameChannel,
      name: data.name.map(r => r),
      active,
    });

    funcOpenModalMailModalChannel(true);
  }, [data, funcOpenModalMailModalChannel, active]);

  return (
    <div className="modal-container">
      <Modal
        aria-labelledby="transition-modal-title1"
        aria-describedby="transition-modal-description1"
        className={classesModal.modal}
        open={openModalMailModalChannel}
        onClose={() => funcOpenModalMailModalChannel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalMailModalChannel}>
          <div className={classesModal.paper}>
            <SendMail data={dataModalMail} />
          </div>
        </Fade>
      </Modal>

      <img src={data.image} alt={data.title} />

      <div className="modal-title">
        <h4 className="global-title-h4">{data.title}</h4>
      </div>

      <div className="modal-channel-box-icon">
        <CssTooltip title="SELECIONE PARA ENVIO EMAIL">
          <IconButton
            size="small"
            aria-label="SELECIONE PARA ENVIO EMAIL"
            onClick={handleSetLocalStorage}
          >
            <FaCheckCircle
              className={`modal-channel-icon ${
                active
                  ? 'modal-channel-icon-check-active'
                  : 'modal-channel-icon-check'
              }`}
              size="30"
            />
          </IconButton>
        </CssTooltip>

        <CssTooltip title="ENVIAR E-MAIL">
          <IconButton
            size="small"
            aria-label="ENVIAR E-MAIL"
            onClick={handleOpenModalMail}
          >
            <HiMail
              className="modal-channel-icon modal-channel-icon-mail"
              size="40"
            />
          </IconButton>
        </CssTooltip>
      </div>

      <div className="modal-channel-box-info">
        <FaRegCalendarAlt
          style={{ marginRight: '10px' }}
          className="modal-channel-icon-check-active"
          size="20"
        />

        <p className="global-paragraph">Modificado em: {data.modified}</p>
      </div>

      <div className="modal-channel-box-description">
        <div>
          <p className="modal-channel-box-description-p">{data.description}</p>
        </div>
        <div>
          <p className="modal-channel-box-description-h6 global-title-h6">
            {data.nameChannel}
          </p>
          {data.name &&
            data.name.map(r => (
              <>
                <p className="global-paragraph">{r}</p>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalChannel;
