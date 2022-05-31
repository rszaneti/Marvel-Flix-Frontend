import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from 'react';
import { IconButton } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Modal, Fade, Backdrop } from '@material-ui/core';

import { FaCheckCircle } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

// Context
import { useChannelSelectedItems } from '../../../context/ChannelSelectedItemsContext';
import { useDeselectAll } from '../../../context/DeselectAllContext';
import { ErrorContext } from '../../../context/ErrorContext';
import { useSendMail } from '../../../context/SendMailContext';

// Services
import { api } from '../../../services/api';

// Components
import Loading from '../../../components/Loading';
import ModalChannel from '../../../components/ModalChannel';
import SendMail from '../../../components/SendMail';

// styles
import {
  CssTextField,
  CssTooltip,
  CssPagination,
  CssModalStyles,
} from '../../../styles/globalMaterialUi';
import '../stylesChannels.scss';
import '../../../styles/global.scss';

interface IComicSummary {
  resourceURI: string; // The path to the individual character resource.,
  name: string; // The full name of the character.,
}

interface IComicList {
  available: number; // The number of total available characters in this list. Will always be greater than or equal to the "returned" value.,
  returned: number; //  The number of characters returned in this collection (up to 20).,
  collectionURI: string; //  The path to the full list of characters in this collection.,
  items: IComicSummary[]; // The list of returned characters in this collection.
}

interface IImage {
  path: string; // The directory path of to the image.,
  extension: string; // The file extension for the image.
}

interface ICreator {
  id: number; // The unique ID of the comic resource.,
  fullName: string; // The canonical title of the comic.,
  modified: Date; // The date the resource was most recently modified.,
  resourceURI: string; // The canonical URL identifier for this resource.,
  thumbnail: IImage; // The representative image for this comic.,
  comics: IComicList; // A resource list containing the characters which appear in this comic.,
  active: boolean;
}

interface ICreatorDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ICreator[];
}

interface ICreatorDataWrapper {
  code: number; // The HTTP status code of the returned result.,
  status: string; // A string description of the call status.,
  copyright: string; // The copyright notice for the returned result.,
  attributionText: string; // The attribution notice for this result. Please display either this notice or the contents of the attributionHTML field on all screens which contain data from the Marvel Comics API.,
  attributionHTML: string; // An HTML representation of the attribution notice for this result. Please display either this notice or the contents of the attributionText field on all screens which contain data from the Marvel Comics API.,
  data: ICreatorDataContainer; // The results returned by the call.,
  etag: string; // A digest value of the content returned by the call.
}

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
  channel: string;
}

const Creators: React.FC<IParamTypes> = ({ channel }) => {
  const classesModal = CssModalStyles();

  // Context
  const { channelSelectedItems, insert, reset } = useChannelSelectedItems();
  const { deselectAll } = useDeselectAll();
  const { ErrorMessage } = useContext(ErrorContext);
  const { funcOpenModalMailChannel, openModalMailChannel } = useSendMail();

  // State
  const [loading, setLoading] = useState(false);
  const [dataModalMail, setDataModalMail] = useState<IParamsModal>(
    {} as IParamsModal,
  );
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<IParamsModal>({} as IParamsModal);
  const [list, setList] = useState<ICreatorDataWrapper>(
    {} as ICreatorDataWrapper,
  );
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('firstName');
  const [order, setOrder] = useState('');

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (list.data) {
      const channelId = channelSelectedItems.filter(
        f => f.channel === channel || 'comics',
      );

      const data: ICreatorDataWrapper = {
        ...list,
        data: {
          ...list.data,
          results: list.data.results.map(r => ({
            ...r,
            active: Boolean(channelId.find(id => id.id === r.id)),
          })),
        },
      };

      setList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deselectAll, channelSelectedItems, channel]);

  const loadList = useCallback(
    async (
      varOrder: string,
      varOrderBy: string,
      varPage: number,
      varText: string,
      varListChannelSelectedItems: IEmailSelect[],
    ) => {
      try {
        setLoading(true);

        const channelId = varListChannelSelectedItems.filter(
          f => f.channel === channel || 'comics',
        );

        const paramsObj = {
          orderBy: `${varOrder}${varOrderBy}`,
          limit: 20,
          offset: (varPage - 1) * 20,
        };

        let paramsSearchText = {};
        if (varText) {
          paramsSearchText = {
            nameStartsWith: varText,
          };
        }

        const params = Object.assign(paramsObj, paramsSearchText);

        const response = await api.get<ICreatorDataWrapper>(channel, {
          params,
        });

        setList({
          ...response.data,
          data: {
            ...response.data.data,
            results: response.data.data.results.map(r => ({
              ...r,
              active: Boolean(channelId.find(id => id.id === r.id)),
            })),
          },
        });
      } catch (err) {
        ErrorMessage(err);
      } finally {
        setLoading(false);
      }
    },
    [ErrorMessage, channel],
  );

  useEffect(() => {
    async function load() {
      await loadList(order, orderBy, page, text, channelSelectedItems);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadList, order, orderBy, page]);

  const handleChangePage = useCallback(
    async (event: ChangeEvent<unknown>, value: number) => {
      await loadList(order, orderBy, value, text, channelSelectedItems);
      setPage(value);
    },
    [order, orderBy, text, channelSelectedItems, loadList],
  );

  const handleChannelSelectedItems = useCallback(
    (
      id: number,
      title: string,
      description: string,
      thumbnail: string,
      modified_date: Date,
      pageCount: number,
      issueNumber: number,
    ) => {
      const channelId = channelSelectedItems.filter(
        f => f.channel === channel || 'comics',
      );

      if (channelId) {
        const existData = channelId.filter(r => r.id === id);

        if (existData.length) {
          // Remove item
          const dataNewChannelId = channelId.filter(r =>
            String(id).indexOf(String(r.id)),
          );

          reset();
          insert(dataNewChannelId);

          // state list manipulation;
          const findIndex = list.data.results.findIndex(r => r.id === id);

          list.data.results[findIndex].active = false;

          const data: ICreatorDataWrapper = {
            ...list,
            data: {
              ...list.data,
              results: list.data.results.map(r => ({ ...r })),
            },
          };

          setList(data);
        } else {
          // Add item
          channelId.push({
            id,
            channel: channel || 'comics',
            title,
            description,
            thumbnail,
            modified: modified_date
              ? `${String(modified_date).substring(8, 10)}/${String(
                  modified_date,
                ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
              : '',
            pageCount,
            issueNumber,
          });

          insert(channelId);

          // state list manipulation;
          const findIndex = list.data.results.findIndex(r => r.id === id);

          list.data.results[findIndex].active = true;

          const data: ICreatorDataWrapper = {
            ...list,
            data: {
              ...list.data,
              results: list.data.results.map(r => ({ ...r })),
            },
          };

          setList(data);
        }
      } else {
        // Add first item
        const dataChannelId: IEmailSelect[] = [
          {
            id,
            channel: channel || 'comics',
            title,
            description,
            thumbnail,
            modified: modified_date
              ? `${String(modified_date).substring(8, 10)}/${String(
                  modified_date,
                ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
              : '',
            pageCount,
            issueNumber,
          },
        ];

        insert(dataChannelId);

        // state list manipulation;
        const findIndex = list.data.results.findIndex(r => r.id === id);

        list.data.results[findIndex].active = true;

        const data: ICreatorDataWrapper = {
          ...list,
          data: {
            ...list.data,
            results: list.data.results.map(r => ({ ...r })),
          },
        };

        setList(data);
      }
    },
    [channel, list, insert, reset, channelSelectedItems],
  );

  const handleChangeOrder = useCallback(async (value: string) => {
    setOrder(value);
  }, []);

  const handleChangeOrderBy = useCallback(async (value: string) => {
    setOrderBy(value);
  }, []);

  const handleChangeSearch = useCallback(
    async (e: string) => {
      setText(e);

      clearTimeout(timer);

      const newTimer = setTimeout(async () => {
        setPage(1);
        await loadList(order, orderBy, 1, e, channelSelectedItems);
      }, 1000);

      setTimer(Number(newTimer));
    },
    [timer, loadList, order, orderBy, channelSelectedItems],
  );

  const handleOpenModal = useCallback(
    (
      id: number,
      title: string,
      description: string,
      modified_date: Date,
      pageCount: number,
      issueNumber: number,
      thumbnail: string,
      image: string,
      nameChannel: string,
      name: IComicSummary[],
      active: boolean,
    ) => {
      setDataModal({
        multiple: false,
        channel: channel || 'comics',
        id,
        title,
        description,
        modified: modified_date
          ? `${String(modified_date).substring(8, 10)}/${String(
              modified_date,
            ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
          : '',
        pageCount,
        issueNumber,
        thumbnail,
        image,
        nameChannel,
        name: name.map(r => r.name),
        active,
      });
      setOpenModal(true);
    },
    [channel],
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleOpenModalMail = useCallback(
    (
      id: number,
      title: string,
      description: string,
      modified_date: Date,
      pageCount: number,
      issueNumber: number,
      thumbnail: string,
      image: string,
      nameChannel: string,
      name: IComicSummary[],
      active: boolean,
    ) => {
      setDataModalMail({
        multiple: false,
        channel: channel || 'comics',
        id,
        title,
        description,
        modified: modified_date
          ? `${String(modified_date).substring(8, 10)}/${String(
              modified_date,
            ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
          : '',
        pageCount,
        issueNumber,
        thumbnail,
        image,
        nameChannel,
        name: name.map(r => r.name),
        active,
      });

      funcOpenModalMailChannel(true);
    },
    [channel, funcOpenModalMailChannel],
  );

  return (
    <div className="content">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classesModal.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classesModal.paper}>
            <ModalChannel data={dataModal} />
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title2"
        aria-describedby="transition-modal-description2"
        className={classesModal.modal}
        open={openModalMailChannel}
        onClose={() => funcOpenModalMailChannel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalMailChannel}>
          <div className={classesModal.paper}>
            <SendMail data={dataModalMail} />
          </div>
        </Fade>
      </Modal>

      <div className="title-form">
        <div>
          <h1 className="global-title-h1">Criadores</h1>
        </div>
        <div>
          <Formik
            initialValues={{
              search_name: '',
              order_by: '',
              order: '',
            }}
            onSubmit={async () => {
              // onsubmit;
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ul className="form">
                  <li>
                    <CssTextField
                      id="input-search-name"
                      label="Pesquisar os criadores"
                      variant="outlined"
                      name="search_name"
                      value={values.search_name}
                      autoComplete="search_name"
                      margin="dense"
                      onChange={e => {
                        handleChange(e);
                        handleChangeSearch(e.target.value);
                      }}
                      onBlur={handleBlur}
                    />
                  </li>
                  <li>
                    <CssTextField
                      id="select-order-by"
                      name="order_by"
                      select
                      label="Ordenar por"
                      value={values.order_by}
                      onChange={e => {
                        handleChange(e);
                        handleChangeOrderBy(e.target.value);
                      }}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        native: true,
                      }}
                      margin="dense"
                      variant="outlined"
                    >
                      <option value="firstName">Nome</option>
                      <option value="lastName">Sobrenome</option>
                      <option value="middleName">Nome do meio</option>
                      <option value="suffix">Sufixo</option>
                      <option value="modified">Modificado em</option>
                    </CssTextField>
                  </li>
                  <li>
                    <CssTextField
                      id="select-order"
                      name="order"
                      select
                      label="Ordem"
                      value={values.order}
                      onChange={e => {
                        handleChange(e);
                        handleChangeOrder(e.target.value);
                      }}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        native: true,
                      }}
                      margin="dense"
                      variant="outlined"
                    >
                      <option value="">Ascendente</option>
                      <option value="-">Decrescente</option>
                    </CssTextField>
                  </li>
                </ul>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {list.data ? (
            !list.data.count ? (
              <div className="no-result">
                <div className="no-result-content">
                  <h4 className="global-title-h4">
                    Nenhuma história em quadrinho encontrada para &quot;
                    {text}&quot;
                  </h4>
                </div>
              </div>
            ) : (
              <ul className="channel-list">
                {list.data.results.map(r => (
                  <li className="channel-list" key={r.id}>
                    <div className="channel-list-content">
                      <img
                        src={`${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`}
                        alt={r.fullName}
                        aria-hidden="true"
                        onClick={() =>
                          handleOpenModal(
                            r.id,
                            r.fullName,
                            '',
                            r.modified,
                            0,
                            0,
                            `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                            `${r.thumbnail.path}/landscape_incredible.${r.thumbnail.extension}`,
                            r.comics.items.length ? 'Personagens' : '',
                            r.comics.items.length ? r.comics.items : [],
                            r.active,
                          )
                        }
                      />
                      <div className="channel-box-info">
                        <p
                          className="global-paragraph"
                          aria-hidden="true"
                          onClick={() =>
                            handleOpenModal(
                              r.id,
                              r.fullName,
                              '',
                              r.modified,
                              0,
                              0,
                              `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                              `${r.thumbnail.path}/landscape_incredible.${r.thumbnail.extension}`,
                              r.comics.items.length
                                ? 'Histórias em Quadrinhos'
                                : '',
                              r.comics.items.length ? r.comics.items : [],
                              r.active,
                            )
                          }
                        >
                          {r.fullName}
                        </p>
                        <div className="channel-box-icon">
                          <CssTooltip title="SELECIONE PARA ENVIO EMAIL">
                            <IconButton
                              size="small"
                              aria-label="SELECIONE PARA ENVIO EMAIL"
                              onClick={() =>
                                handleChannelSelectedItems(
                                  r.id,
                                  r.fullName,
                                  '',
                                  `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                                  r.modified,
                                  0,
                                  0,
                                )
                              }
                            >
                              <FaCheckCircle
                                className={`channel-icon ${
                                  r.active
                                    ? 'channel-icon-check-active'
                                    : 'channel-icon-check'
                                }`}
                                size="30"
                              />
                            </IconButton>
                          </CssTooltip>

                          <CssTooltip title="ENVIAR E-MAIL">
                            <IconButton
                              size="small"
                              aria-label="ENVIAR E-MAIL"
                              onClick={() =>
                                handleOpenModalMail(
                                  r.id,
                                  r.fullName,
                                  '',
                                  r.modified,
                                  0,
                                  0,
                                  `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                                  `${r.thumbnail.path}/landscape_incredible.${r.thumbnail.extension}`,
                                  r.comics.items.length
                                    ? 'Histórias em Quadrinhos'
                                    : '',
                                  r.comics.items.length ? r.comics.items : [],
                                  r.active,
                                )
                              }
                            >
                              <HiMail
                                className="channel-icon channel-icon-mail"
                                size="40"
                              />
                            </IconButton>
                          </CssTooltip>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : null}

          {list.data ? (
            <div className="pagination">
              <CssPagination
                count={Math.ceil(list.data.total / 20)}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handleChangePage}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Creators;
