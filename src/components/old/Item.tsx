import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useTimer } from '../../hooks/useTimer';
import { Item as ItemType } from '../../types/item';

interface ItemProps extends ItemType{}

const Item: React.FC<ItemProps> = ({ item, price, expirationDate }) => {

    const {days, hours, minutes, seconds} = useTimer(expirationDate)

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {item}
                </Typography>
                <Typography variant="body2">
                    Price: {price}€
                </Typography>
                <Typography>
                    Offer ends in {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Item;