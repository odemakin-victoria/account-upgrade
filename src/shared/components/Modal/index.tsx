import { Modal, ModalProps } from "@mantine/core"

export default function CustomModal({ children, ...rest }: ModalProps) {
    return (
        <Modal
            withCloseButton={false}
            {...rest}
            overlayProps={{
                blur: 3,
            }}
        >
            {children}
        </Modal>
    )
}
