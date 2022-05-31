import React, { useCallback, useState } from 'react';
import { IconButton, Modal, Fade, Backdrop } from '@material-ui/core';

import { FaCheckCircle, FaRegCalendarAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

// Context
import { useChannelSelectedItems } from '../../context/ChannelSelectedItemsContext';
import { useSendMail } from '../../context/SendMailContext';

// Components
import SendMail from '../SendMail';

// styles
import { CssTooltip, CssModalStyles } from '../../styles/globalMaterialUi';
import './styles.scss';
import '../../styles/global.scss';

interface IEmailSelect {
  id: number;
  channel: string;
  title: string;
  description: string;
  thumbnail: string;
  modified: string;
  pageCount: number;
  issueNumber: number;
}

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
  data: {
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
  };
}

const ModalChannel: React.FC<IParamTypes> = ({ data }) => {
  const classesModal = CssModalStyles();

  // Context
  const { insert, reset, channelSelectedItems } = useChannelSelectedItems();
  const {
    funcOpenModalMailModalChannel,
    openModalMailModalChannel,
  } = useSendMail();

  // State
  const [active, setActive] = useState(data.active);
  const [dataModalMail, setDataModalMail] = useState<IParamsModal>(
    {} as IParamsModal,
  );

  const handleChannelSelectedItems = useCallback(() => {
    const channelId = channelSelectedItems.filter(
      f => f.channel === data.channel,
    );

    if (channelId) {
      const existData = channelId.filter(r => r.id === data.id);

      if (existData.length) {
        // Remove item
        const dataNewChannelId = channelId.filter(r =>
          String(data.id).indexOf(String(r.id)),
        );

        reset();
        insert(dataNewChannelId);

        setActive(false);
      } else {
        // Add item
        channelId.push({
          id: data.id,
          channel: data.channel,
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          modified: data.modified,
          pageCount: data.pageCount,
          issueNumber: data.issueNumber,
        });

        insert(channelId);

        setActive(true);
      }
    } else {
      // Add first item
      const dataChannelId: IEmailSelect[] = [
        {
          id: data.id,
          channel: data.channel,
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          modified: data.modified,
          pageCount: data.pageCount,
          issueNumber: data.issueNumber,
        },
      ];

      insert(dataChannelId);

      setActive(true);
    }
  }, [data, insert, reset, channelSelectedItems]);

  const handleOpenModalMail = useCallback(() => {
    setDataModalMail({
      multiple: false,
      channel: data.channel,
      id: data.id,
      title: data.title,
      description: data.description,
      modified: data.modified,
      pageCount: data.pageCount,
      issueNumber: data.issueNumber,
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
            onClick={handleChannelSelectedItems}
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

      <div className="modal-channel-box-description">
        <div>
          <div className="modal-channel-box-info">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <FaRegCalendarAlt
                style={{ marginRight: '10px' }}
                className="modal-channel-icon-check-active"
                size="20"
              />

              <p className="global-paragraph">Modificado em: {data.modified}</p>
            </div>

            {data.issueNumber ? (
              <p className="global-paragraph">
                Nº da Edição: {data.issueNumber}
              </p>
            ) : null}
          </div>
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
