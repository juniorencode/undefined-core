import PropTypes from 'prop-types';
import { Breadcrumb } from '../components/Breadcrumb';
import { BaseLayout } from './BaseLayout';
import { Card } from '../components/Card';
import { DataForm } from '../main';

export const DataFormLayout = props => {
  const { children, className, breadcrumb, title, form, handleCancel, modal } =
    props;

  return (
    <BaseLayout>
      <div className="mb-2">
        <Breadcrumb options={breadcrumb} />
      </div>
      {title && (
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
        </div>
      )}
      <Card>
        <DataForm
          className={className}
          form={form}
          handleCancel={handleCancel}
          modal={modal}
        >
          {children}
        </DataForm>
      </Card>
    </BaseLayout>
  );
};

DataFormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ),
  title: PropTypes.string,
  form: PropTypes.object.isRequired,
  handleCancel: PropTypes.func,
  modal: PropTypes.bool
};
