import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  AvatarBadge,
  Tooltip,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  HiDotsHorizontal,
  HiOutlineCurrencyDollar,
  HiCode,
  HiOutlineLibrary,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { Link as ReachLink } from 'react-router-dom';
import { useClipboard } from '@chakra-ui/react';
import EthIcon from '../../assets/EthIcon';
import { ReactComponent as EIcon } from '../../assets/eth.svg';

// Components
import MobileNav from './MobileNav';
import ModelBox from './ModelBox';

export default function WithSubnavigation() {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticating, logout } = useMoralis();

  const address = user ? user.get('ethAddress') : 'No Address Found';
  const { hasCopied, onCopy } = useClipboard(address);

  return (
    <Box>
      <Flex
        bg={useColorModeValue('purple.700', 'blue.500')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('white', 'white')}
            fontWeight={800}
          >
            <ReachLink to="/">DAM Finance</ReachLink>
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Flex align="center" justify="center">
            <Avatar bg="purple.100" size="md" mr={2}>
              <AvatarBadge
                boxSize="1.25em"
                bg={user ? 'green.500' : 'red.500'}
              />
            </Avatar>
            <Tooltip
              hasArrow
              label="Click to Copy address"
              colorScheme="messenger"
            >
              <Button
                ml={2}
                onClick={onCopy}
                colorScheme="linkedin"
                variant="outline"
              >
                {hasCopied ? 'Copied' : 'Ethereum Address'}
              </Button>
            </Tooltip>
            {/* Logout */}
            <Button
              disabled={isAuthenticating}
              colorScheme="whiteAlpha"
              variant="ghost"
              mx={2}
              onClick={() => logout()}
            >
              Logout
            </Button>
            <Button
              onClick={onOpen}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bgGradient="linear(to-r, purple.500, pink.500)"
              href={'#'}
              _hover={{
                bgGradient: 'linear(to-l, purple.500, pink.700)',
              }}
            >
              Connect Wallet
            </Button>
          </Flex>

          <ModelBox isOpen={isOpen} onClose={onClose} />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.300', 'gray.200');
  const linkHoverColor = useColorModeValue('white', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                as={ReachLink}
                to={navItem.href}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      as={ReachLink}
      to={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Valve',
    href: '/valve',
  },
  {
    label: 'Profile',
    href: '/profile',
  },

  //   {
  //     label: "Find Work",
  //     children: [
  //       {
  //         label: "Job Board",
  //         subLabel: "Find your dream design job",
  //         href: "#",
  //       },
  //       {
  //         label: "Freelance Projects",
  //         subLabel: "An exclusive list for contract work",
  //         href: "#",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Learn Design",
  //     href: "#",
  //   },
  //   {
  //     label: "Hire Designers",
  //     href: "#",
  //   },
];
