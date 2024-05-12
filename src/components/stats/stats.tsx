import { Skeleton, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";

interface StatisticsProps {
  title: string;
  amount: number;
  percent: number;
  loading: boolean;
}

export default function Statistics({ title, amount, percent, loading }: StatisticsProps) {
  const formatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  return (
    <Stat bg={useColorModeValue('white', 'gray.700')} p={5} rounded={'lg'} w={'full'}>
      <StatLabel fontSize={{ md: 'xl' }}>{title}</StatLabel>
      {loading
        ? <Skeleton noOfLines={1} h={8} my={2} />
        : <StatNumber fontSize={{ base: 'lg', md: '2xl' }}>{formatIDR}</StatNumber>
      }
      <StatHelpText>
        <StatArrow type='increase' />
        {percent.toFixed(2)}%
      </StatHelpText>
    </Stat>
  )
}